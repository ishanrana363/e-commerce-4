const cartModel = require("../models/cartsModel");
const mongoose = require("mongoose");

const createCartListService =async (req) => {
    try{
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await cartModel.create(reqBody);
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

const updateCartListService = async (req) => {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let cartId = new mongoose.Types.ObjectId(req.params.id);
        let reqBody = req.body;
        const data = await cartModel.updateOne({userID:user_id,_id:cartId},{$set:reqBody},);
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

const deleteCartListService = async (req) => {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let cartId = new mongoose.Types.ObjectId(req.params.id);
        let data = await cartModel.deleteOne({userID:user_id, _id:cartId });
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


const readCarListService = async (req) => {
    try {

        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let matchStage = { $match : { userID:user_id } };

        const joinWithProductId = {
            $lookup : { from:"products",localField:"productID",foreignField:"_id",as:"product" }
        };

        const joinWithCategoryId = {
            $lookup: {
                from: "categories",localField: "product.categoryID", foreignField: "_id", as:"category"
            }
        };

        const joinWithBrandId = {
            $lookup: {
                from: "brands",localField: "product.brandID", foreignField: "_id", as:"brand"
            }
        }

        const unwindProductId = { $unwind : "$product" };
        const unwindBrandId = { $unwind : "$brand" };
        const unwindCategoryId = { $unwind : "$category" };


        const data = await cartModel.aggregate([
            matchStage,joinWithProductId,joinWithCategoryId,joinWithBrandId,unwindProductId,
            unwindBrandId,unwindCategoryId
        ])
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


module.exports = {
    createCartListService,
    updateCartListService,
    deleteCartListService,
    readCarListService
}












