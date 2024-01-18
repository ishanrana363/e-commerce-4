const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const wishesSchema = new Schema({
    productID : {
        type :mongoose.Schema.Types.ObjectId,
        required : true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
},{timestamps:true,versionKey:false});

const wishesModel = model("wishes",wishesSchema);
module.exports = wishesModel;