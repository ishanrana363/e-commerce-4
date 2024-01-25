const express = require("express");

const router = express.Router();
const productController = require("../controllers/productControllers");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware")
const wishController = require("../controllers/wishController");
const cartController = require("../controllers/cartController");
const invoiceController = require("../controllers/invoiceController");
const featureController = require("../controllers/featureController");

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
router.post("/create-review",authMiddleware, productController.productReviewCreate );
router.get("/review-details/:productID", productController.productReviewDetails );
router.post("/product-filter-list",productController.productFilterList)



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

// Cart List

router.post("/create-cart",authMiddleware,cartController.createCartListController);
router.put("/update-cart/:id",authMiddleware,cartController.updateCartListController);
router.delete("/delete-cart/:id",authMiddleware,cartController.deleteCartListController);
router.get("/read-cart",authMiddleware,cartController.readCartListController);

// Invoice

router.post("/invoice-create",authMiddleware,invoiceController.invoiceCreate);
router.post("/payment-success/:trxID",invoiceController.paymentSuccess);
router.post("/payment-fail/:tranId",invoiceController.paymentFail);
router.post("/payment-cancel/:tranId",invoiceController.paymentCancel);
router.post("/payment-ipn/:tranId",invoiceController.paymentIpn);
router.get("/invoice-list",authMiddleware,invoiceController.invoiceList);
router.get("/invoice-product-list/:invoiceID",authMiddleware,invoiceController.invoiceProductList);

//feature

router.get("/feature-list", featureController.featureList )
router.get("/feature-details/:type", featureController.featureDetails )








module.exports = router;