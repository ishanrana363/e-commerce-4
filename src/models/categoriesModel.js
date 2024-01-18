const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const categoriesSchema = new Schema ({
    categoryName : {
        type : String,
        required : true
    },
    categoryImg : {
        type:String,
        required : true
    }
},{timestamps:true,versionKey:false});

const categoriesModel = model("categories",categoriesSchema);

module.exports = categoriesModel;