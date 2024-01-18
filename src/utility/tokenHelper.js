const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.encodeToken = (email,user_id)=>{

    let payload = {

        email : email,
        user_id : user_id
    };
    const exp = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60*24),
    }
    let secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign(payload,secretKey,exp)
}

exports.decodeToken=(token)=>{
    let secretKey = process.env.JWT_SECRET_KEY;
    try {
        return jwt.verify(token,secretKey)
    }catch (e) {
        return null
    }
}