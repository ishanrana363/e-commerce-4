const {decodeToken} = require("../utility/tokenHelper");


module.exports = (req,res,next)=>{
    let token = req.headers["token"];
    if (!token){
        token = req.cookies["token"]
    }
    let decode = decodeToken(token);
    if (decode===null){
        return res.status(401).json({
            status:"fail",
            message : " unauthorize "
        })
    }else {
        let email = decode["email"];
        let user_id = decode["user_id"]
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
}