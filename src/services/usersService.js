const usersModel = require("../models/usersModel")
const sendEmailUtility = require("../utility/emailHelper")

const userOtpService = async (req) => {
    try{
        let email = req.params.email;
        let otpCode = Math.floor(100000 +  Math.random() * 900000);
        let emailText = ` Your verification code is ${otpCode} `;
        let emailSub = ` Verification Code `;
        await sendEmailUtility(email,emailText,emailSub);
        await usersModel.updateOne({email:email}, {$set:{ otp: otpCode }},{upsert:true});
        return {
            status : "success",
            message : "6 digits otp code has been send successfully "
        };

    }catch (e) {
        return {
            status:"fail",
            message : e.toString()
        };
    }
};


module.exports = {
    userOtpService
}