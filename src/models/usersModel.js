const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const usersSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email number!`,
        },
        required: [true, 'User email number required'],
    },
    otp : {
        type : Number,
        required : true
    }
},{timestamps:true,versionKey:false});

const usersModel = model("users",usersSchema);


module.exports = usersModel;