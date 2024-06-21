
const favoriteProductModel =require("../../models/favoriteProductModel")
async function getAllFavorite(req,res) {
    try {
        const currentUser = req.userId
        const allFavoriteProduct = await favoriteProductModel.find({
            userId : currentUser
        })
        const hasFavorite = allFavoriteProduct.some(favorite => favorite.productItems.length > 0);

        if(hasFavorite){
            res.json({
                data : allFavoriteProduct,
                success : true,
                error : false,
                message:"Load successfully "
            })
        }
       else{
        res.json({
            success : true,
            error : false,
            message:"User doesn't have favorite product"
        })
       }
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  getAllFavorite


