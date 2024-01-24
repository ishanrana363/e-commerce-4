const { featureService } = require("../services/featureService")

exports.featureList = async (req,res)=>{
    let result = await featureService();
    res.status(200).send(result)
}