const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const invoiceproductsSchema = new Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    invoiceID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },

},{timestamps:true,versionKey:false});


const invoiceproductsModel = model("invoiceproducts",invoiceproductsSchema);

module.exports = invoiceproductsModel;