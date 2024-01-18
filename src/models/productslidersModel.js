const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const productslidersSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    des : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    productID : {
        type : new mongoose.Types.ObjectId(),
        required : true
    }
},{timestamps:true,versionKey:false});

const productslidersModel = model("productsliders",productslidersSchema);


module.exports = productslidersModel;