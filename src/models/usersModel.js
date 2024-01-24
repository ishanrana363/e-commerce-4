// const mongoose = require("mongoose");
// const {Schema,model} = mongoose;
//
// const userSchema = new Schema({
//     email : {
//         type : String,
//         required : true,
//         lowercase : true,
//         unique : true,
//         trim:true
//     },
//     otp : {
//         type : String,
//         required: true,
//     }
// },{timestamps:true,versionKey:false});
//
// const userModel = model("users",userSchema);
//
// module.exports = userModel;
//
//
//
//
//
//
// // usersSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });
//
//
// // const mongoose = require("mongoose");
// //
// // const { Schema, model } = mongoose;
// //
// // const usersSchema = new Schema(
// //     {
// //         email: {
// //             type: String,
// //             required: true,
// //             unique: true,
// //             lowercase: true,
// //         },
// //         otp: {
// //             type: Number,
// //             required: true,
// //         },
// //         otpCreatedAt: {
// //             type: Date,
// //             default: Date.now,
// //         },
// //     },
// //     { timestamps: true, versionKey: false }
// // );
// //
// // // Function to check if the OTP has expired (current time > otpCreatedAt + 30 seconds)
// // usersSchema.methods.isOtpExpired = function () {
// //     const expirationTime = this.otpCreatedAt.getTime() + 30000; // 30 seconds in milliseconds
// //     return Date.now() > expirationTime;
// // };
// //
// // const usersModel = model("users", usersSchema);
// //
// // module.exports = usersModel;
//



const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
        },
        otp: {
            code: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                expires: 60,
            },
        },
    },
    {
        versionKey: false,
    }
);

const usersModel = model("users", userSchema);

module.exports = usersModel;



// const userModel = model("users",userSchema);
//
// module.exports = userModel;