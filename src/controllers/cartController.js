const {
    createCartListService,
    updateCartListService,
    deleteCartListService,
    readCarListService
} = require("../services/cartService")

exports.createCartListController = async (req,res)=>{
    const result = await createCartListService(req);
    res.status(201).send(result)
};


exports.updateCartListController = async (req,res)=>{
    const result = await updateCartListService(req);
    res.status(200).send(result)
};

exports.deleteCartListController = async (req,res)=>{
    const result = await deleteCartListService(req);
    res.status(200).send(result)
};

exports.readCartListController = async (req,res)=>{
    const result = await readCarListService(req);
    res.status(200).send(result)
};