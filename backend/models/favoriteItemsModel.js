const mongoose = require('mongoose')
const favoriteItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        ref: 'product',
        required: true
    },
    productName: String,
    productImage: [String],
    category:{
        type:String,
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
        type:Number,
        require:true
    },
    sellingPrice: {
        type: Number,
        required: true
    },isFavorite:{
        type:Boolean,
        default:false
    }
}, { _id: false }); // không tạo _id cho các document con

module.exports = favoriteItemSchema;