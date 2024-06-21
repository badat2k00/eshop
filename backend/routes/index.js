const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const deleteOneProductController =require('../controller/product/deleteProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const createOrder =require("../controller/order/createOrder")
const getOrdersbyUser=require("../controller/order/getOrdersbyUser");
const getAllOrders = require('../controller/order/getAllOrders')
const createPaymentUrl = require('../controller/payment/createPaymentUrl')
const returnUrl = require('../controller/payment/returnUrl')
const caculateperday = require('../controller/statistic/caculateperday')
const caculatepermonth = require('../controller/statistic/caculatepermonth')
const addToFavorite=require('../controller/product/addToFavorite');
const deleteAddToFavorite=require('../controller/product/deleteAddtoFavorite');
const getAllFavorite = require('../controller/product/getAllFavorite')
const refreshTokenController =require('../controller/user/refreshToken')
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.post('/refresh-token',refreshTokenController);
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.post("/delete-one-product",authToken,deleteOneProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post("/addtofavorite",authToken,addToFavorite);
router.post("/deletefavoriteproduct",authToken,deleteAddToFavorite)
router.get("/getfavoriteproduct",authToken,getAllFavorite)
//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

// order
router.post("/create-order",authToken,createOrder);
router.get("/getorders",authToken,getOrdersbyUser);
router.get("/allorders",authToken,getAllOrders);
// localhost:8080/api


// test payment 
router.get('/returnUrl',authToken,returnUrl);
router.post('/create-payment-url',authToken,createPaymentUrl)

// test statistic

router.post('/caculateperday',authToken,caculateperday);
router.post('/caculatepermonth',authToken,caculatepermonth)


module.exports = router