const {
    wishCreateService,
    wishRemoveService,
    wishReadService
} = require("../services/wishService");

exports.wishListCreateController = async (req,res) =>{
    let result = await wishCreateService(req);
    res.status(201).json(result)

};

exports.wishListRemoveController = async (req,res) =>{
        let result = await wishRemoveService(req);
        res.status(200).json(result)
};

exports.wishListReadController = async (req,res) =>{

        let result = await wishReadService(req);
        res.status(200).json(result)

};