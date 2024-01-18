const mongoose = require("mongoose");

const {Schema,model} = mongoose; 

const reviewSchema = new Schema({
    userID : {
        type : new mongoose.Types.ObjectId(),
        required : true,
    },
    productID : {
        type : new mongoose.Types.ObjectId(),
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating : {
        type : String
    }
},{timestamps:true,versionKey:false});

const reviewModel = model("reviews",reviewSchema);

module.exports = reviewModel