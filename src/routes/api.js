const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/product-slider-list",productController.productSliderList);
router.get("/product-category-list",productController.productCategoryList);
router.get("/product-brand-list",productController.productBrandList);
router.get("/product-by-category-list/:categoryID",productController.productByCategoryList);
router.get("/product-by-brand-list/:brandID",productController.productByBrandList);
router.get("/product-by-similar-list/:categoryID",productController.productBySimilerList);
router.get("/product-details/:productID",productController.productDetailsList);
router.get("/productRemark/:remark",productController.productRemarkList);


module.exports = router;