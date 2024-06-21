const mongoose = require('mongoose')

const orderItemSchema =require('./orderItemsModel')
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
    },
    customerName:String,
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending','completed','canceled']
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paymentMethod:{
        type:String,
        default:"VNPAY",
        enum:['VNPAY','COD']
    },
    items: [orderItemSchema]
},{
    timestamps : true
})


const orderModel =  mongoose.model("order",orderSchema)


module.exports = orderModel