const productSliderModel = require("../models/productSliderModel");
const productCategoryModel = require("../models/categoriesModel");
const productbrandsModel = require("../models/brandsModel");
const productsModel = require("../models/productsModel")
const reviewModel = require("../models/reviewModel");
const { default: mongoose } = require("mongoose");

//productSliderService

const productSliderService = async () =>{
    try {
        let data = await productSliderModel.find();
        return {
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
};

//productCategoryService

const productCategoryService  = async () =>{
    try {
        const data = await productCategoryModel.find();
        return{
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
};

//productBrandService

const productBrandService  = async () =>{
    try {
        const data = await productbrandsModel.find();
        return{
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
};

const productByCategoryListService = async (req) =>{
    try {
        let categoryId = new mongoose.Types.ObjectId(req.params.categoryID);
        let matchStage = { $match : { categoryID : categoryId } };
        let joinWithCategoryId = {
            $lookup : { from : "categories" , localField:"categoryID",foreignField:"_id",as:"category" }
        };

        let joinWithBrandId = {
            $lookup : { from : "brands" , localField:"brandID",foreignField:"_id",as:"brand" }
        }

        let unwindCategoryId = { $unwind : "$category" }
        let unwindBrandId = { $unwind : "$brand" }

        let data = await productsModel.aggregate([
            matchStage,
            joinWithCategoryId,joinWithBrandId,
            unwindCategoryId,unwindBrandId
        ])
        return{
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
};

const productByBrandListService = async (req) =>{
    try {
        let brandId = new mongoose.Types.ObjectId(req.params.brandID);
        let matchStage = { $match : { brandID : brandId } };
        let joinWithCategoryId = {
            $lookup : { from : "categories" , localField:"categoryID",foreignField:"_id",as:"category" }
        };

        let joinWithBrandId = {
            $lookup : { from : "brands" , localField:"brandID",foreignField:"_id",as:"brand" }
        }

        let unwindCategoryId = { $unwind : "$category" }
        let unwindBrandId = { $unwind : "$brand" }

        let data = await productsModel.aggregate([
            matchStage,
            joinWithCategoryId,joinWithBrandId,
            unwindCategoryId,unwindBrandId
        ])
        return{
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
};

const productBySimilarListService = async (req)=>{
    try{
        let categoryId = new mongoose.Types.ObjectId(req.params.categoryID);
        let matchStage = { $match : { categoryID: categoryId } };
        let limitStage = { $limit : 5 }
        let joinWithCategoryId = {
            $lookup : {
                from:"categories",localField: "categoryID",foreignField:"_id",as:"category"
            }
        };

        let joinWithBrandId = {
            $lookup : {
                from:"brands",localField: "brandID",foreignField:"_id",as:"brand"
            }
        };

        let unwindCategoryId = { $unwind : "$category" };
        let unwindBrandId = { $unwind : "$brand" };

        let data = await productsModel.aggregate([
            matchStage , joinWithCategoryId, joinWithBrandId,limitStage,unwindCategoryId, unwindBrandId
        ]);

        return{
            status:"success",
            data : data
        }
    }catch (e) {
        return{
            status : "fail",
            data : e.toString()
        }
    }
};

const productDetailsService = async (req) =>{
    try{
        let productId = new mongoose.Types.ObjectId(req.params.productID);
        let matchStage = { $match : { _id : productId } };
        let joinWithCategoryId = {
            $lookup : {
                from:"categories",localField: "categoryID",foreignField:"_id",as:"category"
            }
        };

        let joinWithBrandId = {
            $lookup : {
                from:"brands",localField: "brandID",foreignField:"_id",as:"brand"
            }
        };

        let joinWithProductId = {
            $lookup : {
                from : "productdetails" ,localField:"_id",foreignField:"productID",as:"product"
            }
        }

        let unwindCategoryId = { $unwind : "$category" };
        let unwindBrandId = { $unwind : "$brand" };
        let unwindProductId = { $unwind : "$product" };

        let data = await productsModel.aggregate([
            matchStage,joinWithCategoryId,joinWithBrandId,joinWithProductId,
            unwindCategoryId,unwindBrandId,unwindProductId
        ])
        return{
            status:"success",
            data : data
        }

    }catch (e) {
        return{
            status : "fail",
            data : e.toString()
        }
    }
};

const productByRemarkListService = async (req) => {
    try {
        let remark = req.params.remark;
        let matchStage = { $match: { remark: remark } };
        let joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let joinWithBrandId = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let unwindCategoryId = { $unwind: "$category" };
        let unwindBrandId = { $unwind: "$brand" };
        let data = await productsModel.aggregate([
            matchStage, joinWithCategoryId, joinWithBrandId, unwindCategoryId, unwindBrandId
        ]);
        return {
            status: "success",
            data: data
        }
    } catch (e) {
        return {
            status: "fail",
            data: e.toString()
        }
    }
};


const productKeywordService = async (req) => {
    try {
        let SearchRegex = { "$regex" : req.params.keyword, "$options":"i" };
        let searchQuery = [ {title:SearchRegex}, {shortDes: SearchRegex}];
        let searchParams = { $or : searchQuery };
        let matchStage = { $match : searchParams };
        let joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let joinWithBrandId = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let unwindCategoryId = { $unwind: "$category" };
        let unwindBrandId = { $unwind: "$brand" };
        let data = await productsModel.aggregate([
            matchStage, joinWithCategoryId, joinWithBrandId, unwindCategoryId, unwindBrandId
        ]);

        return {
            status: "success",
            data: data
        }

    }catch (e) {
        return {
            status: "fail",
            data: e.toString()
        }
    }
};


const createReviewService = async (req) =>{
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await reviewModel.create(reqBody);
        return{
            status:"success",
            data : data
        }
    }catch (e) {
        return {
            status:"fail",
            message : e.toString()
        }
    }
};


const productReviewDetails = async (req) =>{
    try {
        let ProductId = new mongoose.Types.ObjectId(req.params.productID);
        const matchStage = { $match : { productID : ProductId } };

        const joinWithUserId = {
            $lookup : {
                from : "prfiles" , localField:"userID",foreignField:"userID",as:"profile"
            }
        }
        const unwindProfile = { $unwind : "$profile" }
        let projection = { $project : {
                "description"  : 1,
                "rating" : 1,
                "profile.cus_name" : 1
            } }
        let data = await reviewModel.aggregate([
            matchStage,joinWithUserId,unwindProfile,projection
        ])
        return {
            status: "success",
            data: data
        }

    }catch (e) {
        return {
            status:"fail",
            message : e.toString()
        };
    }
};










module.exports = {
    productSliderService,
    productCategoryService,
    productBrandService,
    productByCategoryListService,
    productByBrandListService,
    productBySimilarListService,
    productDetailsService,
    productByRemarkListService,
    productKeywordService,
    createReviewService,
    productReviewDetails

}