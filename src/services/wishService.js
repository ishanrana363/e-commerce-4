const wishModel = require("../models/wishesModel");
const mongoose = require("mongoose");

const wishCreateService = async (req) => {
    try{
        let user_id = req.headers["user_id"];
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await wishModel.updateOne(reqBody,{$set:reqBody},{upsert:true});
        return{
            status:"success", data : data
        }
    }catch (e) {
        return {
            status:"fail",
            data : e.toString()
        };
    }
};

const wishRemoveService = async (req) => {
    try{
        let user_id = req.headers["user_id"];
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await wishModel.deleteOne(reqBody);
        return{
            status:"success", data : data
        };
    }catch (e) {
        return {
            status:"fail",
            data : e.toString()
        };
    }
};

const wishReadService = async (req) => {
    try{
        let user_id = new mongoose.Types.ObjectId(req.headers["user_id"]);
        let matchStage = { $match : { userID : user_id } };

        const joinWithProductId = {
            $lookup : { from:"products",localField:"productID",foreignField:"_id",as:"product" }
        };

        const joinWithBrandId = {
            $lookup: {
                from: "brands",localField: "product.brandID", foreignField: "_id", as:"brand"
            }
        }

        const joinWithCategoryId = {
            $lookup: {
                from: "categories",localField: "product.categoryID", foreignField: "_id", as:"category"
            }
        }

        const unwindProductId = { $unwind : "$product" };
        const unwindBrandId = { $unwind : "$brand" };
        const unwindCategoryId = { $unwind : "$category" };

        const data = await wishModel.aggregate([
            matchStage,joinWithProductId,joinWithBrandId,joinWithCategoryId,unwindBrandId,unwindProductId,
            unwindCategoryId
        ]);
        return{
            status:"success", data : data
        };
    }catch (e) {
        return {
            status:"fail",
            data : e.toString()
        };
    }
};


module.exports = {
    wishCreateService,
    wishRemoveService,
    wishReadService
}