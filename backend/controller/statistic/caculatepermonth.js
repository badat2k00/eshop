const caculateperday =require("../../controller/statistic/caculateperday")
async function caculatepermonth(req,res) {
    try {
        const orderDate=req.body.orderDate
        const parseDate = moment(orderDate,'DD-MM-YYYY');
        let totalAmount=0;
        totalAmount +=caculateperday(orderDate);
       res.status(200).json({
        data:totalAmount
       })
    
    } catch (error) {
        console.error(error)
    }
}
module.exports=caculatepermonth