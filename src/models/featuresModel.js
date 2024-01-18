const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const featuresSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const featuresModel = model("features",featuresSchema);


module.exports = featuresModel;