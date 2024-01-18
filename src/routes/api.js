const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/product-slider-list",productController.productSliderList);
router.get("/product-category-list",productController.productCategoryList);


module.exports = router;