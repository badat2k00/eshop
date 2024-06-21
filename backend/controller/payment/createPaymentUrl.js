let config = require("config");
let moment = require("moment");
let socket =require('node:net');
//   // "vnp_Url":"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
const orderModel =require("../../models/orderModel") ;
async function createPaymentUrl(req, res, next) {
  let currentUser =req.userId;
  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");
  let vnpUrl = config.get("vnp_Url");
  let returnUrl = config.get("vnp_ReturnUrl");
  console.log(returnUrl)

  let ipAddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;


  let now = moment();

  let createDate = now.format('yyyyMMDDHHmmss');
  // let orderId =  await orderModel.find({ userId: currentUser,isPaid:false}, 'orderId')
  
  // let amount = await orderModel.find({userId:currentUser,isPaid:false},'totalAmount');

  let order = await orderModel.findOne({ userId: currentUser, isPaid: false }).exec();
  if (!order) {
    return res.status(404).send("No unpaid order found for this user");
  }

  let orderId = order._id;
  let amount = order.totalAmount;

  // let bankCode = req.body.bankCode;

  let orderInfo = `Thanh toan đon hang`+orderId;
  // let orderType = req.body.orderType;
  let locale =req.body.language

  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  // vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount ;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  // if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = "NCB";
  // }
  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

   vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.json({
    data:vnp_Params,
    
  })
  order.isPaid=true
  // res.redirect("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html")
  await order.save();
  next();
}




module.exports = createPaymentUrl