const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const usersSchema = new Schema({
    email: {
       type: String,
        required: true,
        unique : true,
        lowercase : true
    },
    otp : {
        type : Number,
        required : true
    }
},{timestamps:true,versionKey:false});

const usersModel = model("users",usersSchema);


module.exports = usersModel;