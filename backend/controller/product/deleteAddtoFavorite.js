const productModel = require('../../models/productModel');
const favoriteProductModel = require('../../models/favoriteProductModel');
async function deleteAddToFavorite(req, res) {
    try {
      const currentUser =req.userId;
      const { productId } = req.body;
  
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          error: true,
          success: false,
        });
      }
  
      // Update isFavorite in Product Model
      product.isFavorite = false;
      await product.save();
  
      // Delete Favorite Item
      const favoriteProduct = await favoriteProductModel.findOne({ userId: currentUser});
      
      console.log(favoriteProduct);
      if (favoriteProduct) {
        favoriteProduct.productItems = favoriteProduct.productItems.filter(
          item =>  item.productId!=productId
        );
  
  
        if (favoriteProduct.productItems.length > 0) {
          await favoriteProduct.save();
        } else {
          await favoriteProductModel.deleteOne({ userId: currentUser });
        }
      }
      
  
      res.json({
        message: "Product removed from favorites successfully",
        success: true,
        error: false
      });
     
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }
  module.exports= deleteAddToFavorite 