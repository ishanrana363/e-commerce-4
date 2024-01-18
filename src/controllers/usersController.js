const {
    userOtpService
} =
require("../services/usersService");



exports.userOtp= async (req,res) =>{
    let result = await userOtpService(req);
    res.status(201).send(result)
}