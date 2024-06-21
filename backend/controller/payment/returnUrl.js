 function returnUrl(req, res) {
    let vnp_Params = req.query;
  
    let secureHash = vnp_Params['vnp_SecureHash'];
  
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
  
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
  
    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
  
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");     
    
    let responseCode = '97'; // Default to failure
    if (secureHash === signed) {
        // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        responseCode = vnp_Params['vnp_ResponseCode'];
    }

    res.redirect(`/success?code=${responseCode}`);
    // if(secureHash === signed){
    //     //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      
    //     res.json({code: vnp_Params['vnp_ResponseCode']})
    // }
  }
  module.exports = returnUrl