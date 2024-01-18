const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const productsSchema = new Schema({
    title : {
        type : String,
        required:true
    },
    shortDes : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    discount : {
        type : Boolean
    },
    discountPrice : {
        type : String
    },
    image : {
        type : String,
        required : true
    },
    star : {
        type : String,
        required : true
    },
    stock : {
        type : String,
        required : true
    },
    remark : {
        type : String,
        required : true
    },
    categoryID : {
        type : new mongoose.Types.ObjectId(),
        required : true
    },
    brandID : {
        type : new mongoose.Types.ObjectId(),
        required : true
    }
},{timestamps:true,versionKey:false});

const productsModel = model("products",productsSchema);

module.exports = productsModel;