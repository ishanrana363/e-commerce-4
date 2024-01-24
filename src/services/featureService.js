const featureModel = require("../models/featuresModel");

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


module.exports = {
    featureService
}