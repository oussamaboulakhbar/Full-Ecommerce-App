const express = require('express');
const UserSignUpController = require('../controller/user/UserSignUp');
const userSignInController = require('../controller/user/UserSignin');
const userDetailsController = require('../controller/user/Userdetail');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/UserLogout');
const AllUsers = require('../controller/user/Allusers');
const UpdateUser = require('../controller/user/UpdateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/CountAddToCart');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCart');
const searchProduct = require('../controller/product/searchProduct');
const router = express.Router();

router.post('/signup', UserSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details',authToken,userDetailsController);
router.get('/userLogout',userLogout);

/////admin panel
router.get('/all-users',authToken,AllUsers)
router.post('/update-user',authToken,UpdateUser)

//////Product
router.post('/upload-product',authToken,UploadProductController)
router.get('/get-product',getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/get-categoryProduct',getCategoryProduct)
router.post('/category-Product',getCategoryWiseProduct)
router.post('/product-details',getProductDetails)
router.get('/search',searchProduct)


//////userAddToCart
router.post('/addtocart',authToken,addToCartController)
router.get('/countAddToCartProduct',authToken,countAddToCartProduct)
router.get('/view-cart-product',authToken,addToCartViewProduct)
router.post('/update-cart-product',authToken,updateAddToCartProduct)
router.post('/delete-cart-product',authToken,deleteAddToCartProduct)


module.exports = router;
