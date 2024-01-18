const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const invoicesSchema = new Schema({
    userID : {
        type : new mongoose.Types.ObjectId(),
        required : true
    },
    payable : {
        type : String,
        required : true
    },
    cus_details : {
        type : String,
        required : true
    },
    ship_details : {
        type : String,
        required : true
    },
    tran_id : {
        type : String,
        required : true
    },
    val_id : {
        type : String,
        required : true
    },
    delivery_status : {
        type : String,
        required : true
    },
    payment_status : {
        type : String,
        required : true
    },
    total : {
        type : String,
        required : true
    },
    vat : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const invoicesModel = model("invoices",invoicesSchema);

module.exports = invoicesModel;