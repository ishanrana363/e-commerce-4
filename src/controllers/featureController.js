const { featureService,featureServiceDetails } = require("../services/featureService")

exports.featureList = async (req,res)=>{
    let result = await featureService();
    res.status(200).send(result)
}

exports.featureDetails = async (req,res)=>{
    let result = await featureServiceDetails(req)
    res.status(200).send(result)
}