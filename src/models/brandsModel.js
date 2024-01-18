const mongoose = require("mongoose");

const {model,Schema} = mongoose;


const brandsSchema = new Schema({
    brandName : {
        type : String,
        required : true
    },
    brandImg : {
        type : String,
        required : true
    }

},{timestamps:true,versionKey:false});

const brandsModel = model("brands",brandsSchema);

module.exports = brandsModel;