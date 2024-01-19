const {
    sendEmailService,
    verifyLoginService,
    profileCreateService
} = require("../services/usersService");

exports.sendEmail = async (req,res) =>{
    try {
        let result = await sendEmailService(req);
        res.status(201).send(result);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};

exports.userLoginController = async (req,res) =>{

        let result = await verifyLoginService(req);
        if (result["status"]==="success"){
            // cookie options

            let cookieOption = {
                expires : new Date( Date.now() + 24*60*60*1000),
                httpOnly : false
            }
            // ser cookie response
            res.cookie("token",result["token"],cookieOption);
            res.status(200).send(result);

        }else {
            res.status(200).send(result);
        }


};

exports.logoutController = async (req,res) =>{
    // cookie
}

exports.profileCreate = async (req,res) =>{
    try {
        let result = await profileCreateService(req);
        res.status(200).send(result);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};