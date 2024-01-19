const userModel = require("../models/usersModel");
const sendEmailUtility = require("../utility/emailHelper")
const {encodeToken} = require("../utility/tokenHelper");
const profilesModel = require("../models/profilesModel")
  const sendEmailService = async (req) =>{
    try {
        let email = req.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 999999 );
        let emailText = ` Your verification code is ${otpCode} `;
        let emailSub = ` Verification code `
        await sendEmailUtility(email,emailText,emailSub);
        await userModel.updateOne({email:email}, { $set : { otp:otpCode } } ,{ upsert : true } )
        return{
            status:"success",
            data : " 6 digits otp send successfully "
        }
    }catch (e) {
        return {
            status:"fail",
            data : e.toString()
        }
    }
}

const verifyLoginService = async (req) => {
    try{
        let email = req.params.email;
        let otp = req.params.otp
        let total = await userModel.countDocuments({email:email,otp:otp})
        if(total==1){
            const user_id = await userModel.find({email:email,otp:otp}).select("_id");
            let token = encodeToken(email,user_id[0]["_id"].toString());
            await userModel.updateOne({email:email},{$set:{otp:0}});
            return{
                status: "success",
                token : token
            }
        }else{
            return{
                status: "success",
                message : "Invalid token"
            }
        }
    }catch(e){
        return {
            status: "fail",
            message: e.toString(),
        };
    }
}

const profileCreateService = async (req) =>{
      try {
          let user_id = req.headers["user_id"];
          let reqBody = req.body;
          reqBody.userID = user_id;
          let data = await profilesModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
          return {
              status:"success",data : data
          }
      }catch (e) {
          return {
              status: "fail",
              message: e.toString(),
          };
      }
}

const profileUpdateService = async (req) =>{
    try {
        let user_id = req.headers.user_id;
        console.log(user_id)
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await profilesModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
        return {
            status:"success",data : data
        }
    }catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};

const profileReadService = async (req) => {
    try {
        let user_id = req.headers["user_id"];
        let filter = { userID:user_id };
        let data = await profilesModel.findOne(filter);
        return{
            status:"success",
            data : data
        }

    }catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};

module.exports = {
    sendEmailService,
    verifyLoginService,
    profileCreateService,
    profileUpdateService,
    profileReadService
}