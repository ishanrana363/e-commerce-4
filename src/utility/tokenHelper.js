const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.encodeToken = (email, user_id) => {
    let payload = {

    };

    let secretKey = process.env.JWT_SECRET_KEY;

    return jwt.sign(payload, secretKey);
};

exports.decodeToken=(token)=>{
    let secretKey = process.env.JWT_SECRET_KEY;
    try {
        return jwt.verify(token,secretKey)
    }catch (e) {
        return null
    }
}