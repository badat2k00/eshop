const productModel = require('../../models/productModel');
const favoriteProductModel = require('../../models/favoriteProductModel');
async function addToFavorite(req, res) {
  try {
    const currentUser = req.userId;
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
    product.isFavorite = true;
    await product.save();

    let favoriteProduct = await favoriteProductModel.findOne({ userId: currentUser });

    // Create Favorite Item
    const favoriteItem = {
      productId: product._id,
      productName: product.productName,
      productImage: product.productImage[0],
      category: product.category,
      quantity: 1, // or whatever the default quantity is
      sellingPrice: product.sellingPrice,
      price:product.price,
      isFavorite: true
    };

    // if (favoriteProduct) {
    //   // Add item to existing favorite product list
    //   favoriteProduct.productItems.push(favoriteItem);
    //   await favoriteProduct.save();
    // } else {
    //   // Create a new favorite product list
    //   const newFavoriteProduct = new favoriteProductModel({
    //     userId: currentUser,
    //     productItems: [favoriteItem]
    //   });
    //   await newFavoriteProduct.save();
    // }

    if (favoriteProduct) {
      // Check if the item is already in the favorite product list
      const itemExists = favoriteProduct.productItems.some(item => item.productId.toString() === product._id.toString());

      if (itemExists) {
        return res.json({
          message: "Product already exists in favorites",
          success: false,
          error: true,
        });
      }

      // Add item to existing favorite product list
      favoriteProduct.productItems.push(favoriteItem);
      await favoriteProduct.save();
    } else {
      // Create a new favorite product list
      favoriteProduct = new favoriteProductModel({
        userId: currentUser,
        productItems: [favoriteItem]
      });
      await favoriteProduct.save();
    }


    res.json({
      message: "Product added to favorites successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}


module.exports = addToFavorite;
