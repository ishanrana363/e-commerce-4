const usersModel = require("../models/usersModel")
const sendEmailUtility = require("../utility/emailHelper")
const { encodeToken } = require("../utility/tokenHelper");
const profilesModel = require("../models/profilesModel")
const sendEmailService = async (req) => {
    try {
        let email = req.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 999999);
        let emailText = ` Your verification code is ${otpCode} `;
        let emailSub = ` Verification code `
        await sendEmailUtility(email, emailText, emailSub);
        await usersModel.updateOne({ email: email }, { $set: { otp: otpCode } }, { upsert: true })
        return {
            status: "success",
            data: " 6 digits otp send successfully "
        }
    } catch (e) {
        return {
            status: "fail",
            data: e.toString()
        }
    }
};

const verifyLoginService = async (req) => {
    try {
        let email = req.params.email || req.body.email;
        let otpCode = req.params.otp || req.body.otp;

        const user = await usersModel.findOne({ email: email, otp: otpCode });

        if (user) {
            let token = encodeToken(email, user._id.toString());
            await usersModel.updateOne({ email: email }, { otp: 0 }); 
            return {
                status: "success",
                token: token,
            };
        } else {
            return {
                status: "fail",
                message: "Invalid OTP",
            };
        }
    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};


module.exports = verifyLoginService;






const profileCreateService = async (req) => {
    try {
        let user_id = req.headers["user_id"];
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await profilesModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });
        return {
            status: "success", data: data
        }
    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};

const profileUpdateService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        console.log(user_id)
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await profilesModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });
        return {
            status: "success", data: data
        }
    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};

const profileReadService = async (req) => {
    try {
        let user_id = req.headers["user_id"];
        let filter = { userID: user_id };
        let data = await profilesModel.findOne(filter);
        return {
            status: "success",
            data: data
        }

    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};


const userProfileDeleteService = async (req) => {
    try {
        let user_id = req.headers["user_id"];
        let id = req.params.id
        // let filter = { userID : user_id };
        let data = await profilesModel.deleteOne({ userID: user_id, _id: id });
        return {
            status: "success",
            data: data
        }
    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
}

module.exports = {
    sendEmailService,
    verifyLoginService,
    profileCreateService,
    profileUpdateService,
    profileReadService,
    userProfileDeleteService
}