const {
    sendEmailService,
    verifyLoginService,
    profileCreateService,
    profileUpdateService,
    profileReadService,
    userProfileDeleteService
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

exports.userLogoutController = async (req,res) =>{
    // cookie options
    let cookieOption = {
        expires : new Date( Date.now() - 24*60*60*1000),
        httpOnly : false
    }
    // remove cookie
    res.cookie("token","",cookieOption);
    res.status(200).json({
        status:"success",
        message : " User logout successfully "
    })
}

exports.profileCreateController = async (req,res) =>{
    try {
        let result = await profileCreateService(req);
        res.status(201).send(result);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};

exports.profileUpdateController = async (req,res) =>{
    try {
        let result = await profileUpdateService(req);
        console.log(result)
        res.status(201).send(result);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};


exports.profileReadController = async (req,res) =>{
    try {
        let result = await profileReadService(req);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};


exports.profileDeleteController = async (req,res) =>{
    try {
        let result = await userProfileDeleteService(req);
        res.status(201).send(result);
    }catch (e) {
        res.status(404).send({
            status : "fail",
            data : e.toString()
        });
    }
};


















