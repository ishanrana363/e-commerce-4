const mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    des : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        requird : true
    },
    image : {
        type : String,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true,versionKey:false});
const productslidersModel = mongoose.model("productsliders",dataSchema);

module.exports = productslidersModel;