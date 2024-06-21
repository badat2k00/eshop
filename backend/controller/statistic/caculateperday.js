const orderModel=require('../../models/orderModel');
let moment = require("moment");
async function caculateperday(req,res){
    try {
       
       const orderDate=req.body.orderDate;
       const parsedDate = moment(orderDate, 'DD-MM-YYYY');
        if (!parsedDate.isValid()) {
            return res.status(400).json({
                message: "Invalid date format",
                success: false
            });
        }

        const startOfDay = parsedDate.startOf('day').toDate();
        const endOfDay = parsedDate.endOf('day').toDate();

        
        const orders = await orderModel.find({
            orderDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }, 'totalAmount');

        let revenueperday=0;
        for(i=0;i<orders.length;i++){
            revenueperday+=orders[i].totalAmount
        }
        
        res.json({
            data: {orders,revenueperday},
            message: "Ok",
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
module.exports = caculateperday


// Nhap 7-6-2024

// Tim trong orderDate