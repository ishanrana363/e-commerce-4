const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware")
const wishController = require("../controllers/wishController");

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

// Email

router.get("/otp-create/:email",usersController.sendEmail);
router.get("/login/:email/:otp",usersController.userLoginController);
router.get("/logout",authMiddleware,usersController.userLogoutController);
router.post("/profile-create",authMiddleware,usersController.profileCreateController);
router.post("/profile-update",authMiddleware,usersController.profileUpdateController);
router.get("/profile-read",authMiddleware,usersController.profileReadController);
router.delete("/profile-delete/:id",authMiddleware,usersController.profileDeleteController);


// wish list service

router.post("/wish-create",authMiddleware,wishController.wishListCreateController);
router.delete("/wish-delete",authMiddleware,wishController.wishListRemoveController);
router.get("/wish-read",authMiddleware,wishController.wishListReadController);







module.exports = router;