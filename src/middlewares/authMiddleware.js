const jwt = require("jsonwebtoken");
const {decodeToken} = require("../utility/tokenHelper");

module.exports=(req,res,next)=>{
    let token = req.headers["token"];
    if (!token){
        token = req.cookies["token"];
    }

    let decoded = decodeToken(token);
    if (decoded===null){
        res.status(401).json({
            status:"fail",
            message : " unauthorized "
        })
    }else {
        let email = decoded["email"];
        console.log(`auth middleware email `,email);
        let user_id = decoded["user_id"];
        console.log(`auth middleware user_id`,user_id)
        req.headers.email = email;
        req.headers.user_id = user_id;
        next()
    }

}