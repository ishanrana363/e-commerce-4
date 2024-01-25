const featureModel = require("../models/featuresModel");
const legalModel = require("../models/legalModel")
const featureService = async () => {
    try {
        let data = await featureModel.find();
        return{
            status:"success", data : data
        }
    }catch (e) {
        return {
            status:"fail",
        }
    }
}


const featureServiceDetails = async (req) => {
    try {
        let type = req.params.type;
        let data = await legalModel.find({type:type});
        return{
            status:"success",
            data : data
        }
    }catch (e) {
        return {
            status:"fail",
        }
    }
}


module.exports = {
    featureService,
    featureServiceDetails
}