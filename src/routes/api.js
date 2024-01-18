const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");
const usersController = require("../controllers/usersController");

// Product

router.get("/product-slider-list",productController.productSliderList);
router.get("/product-category-list",productController.productCategoryList);
router.get("/product-brand-list",productController.productBrandList);
router.get("/product-by-category-list/:categoryID",productController.productByCategoryList);
router.get("/product-by-brand-list/:brandID",productController.productByBrandList);
router.get("/product-by-similar-list/:categoryID",productController.productBySimilerList);
router.get("/product-details/:productID",productController.productDetailsList);
router.get("/productRemark/:remark",productController.productRemarkList);
router.get("/search/:keyword",productController.productSearchList);

router.get("/otp-create/:email",usersController.userOtp);




module.exports = router;