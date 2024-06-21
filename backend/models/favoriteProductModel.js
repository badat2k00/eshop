const mongoose = require("mongoose");
const favoriteItemSchema = require("./favoriteItemsModel");

const favoriteProductSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type:String,
      ref:'user'
    },
    productItems:[favoriteItemSchema]
  },
  {
    timestamps: true,
  }
);

const favoriteProductModel = mongoose.model("favoriteitem", favoriteProductSchema);

module.exports = favoriteProductModel;
