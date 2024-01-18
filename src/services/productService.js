const productSliderModel = require("../models/productSliderModel");
const productCategoryModel = require("../models/categoriesModel");
const productbrandsModel = require("../models/brandsModel");
const productsModel = require("../models/productsModel")
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
}

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
}

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
}

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
}

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
}

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
}





module.exports = {
    productSliderService,
    productCategoryService,
    productBrandService,
    productByCategoryListService,
    productByBrandListService,
    productBySimilarListService

}