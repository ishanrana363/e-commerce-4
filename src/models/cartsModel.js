const mongoose = require("mongoose");

const { Schema,model } = mongoose;

const cartsSchema = new Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});


const cartsModel = model("carts",cartsSchema);


module.exports = cartsModel;