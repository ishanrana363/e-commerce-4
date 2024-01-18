const {
    productSliderService,
    productCategoryService,
    productBrandService,
    productByCategoryListService,
    productByBrandListService,
    productBySimilarListService,
    productDetailsService,
    productByRemarkListService,
    productKeywordService

} =require("../services/productService");


exports.productSliderList = async (req,res) =>{
    let result = await productSliderService();
    res.status(200).send(result)
}
exports.productCategoryList = async (req,res) =>{
    let result = await productCategoryService();
    res.status(200).send(result)
}
exports.productBrandList = async (req,res) =>{
    let result = await productBrandService();
    res.status(200).send(result)
}

exports.productByCategoryList = async (req,res) =>{
    let result = await productByCategoryListService(req);
    res.status(200).send(result)
}
exports.productByBrandList = async (req,res) =>{
    let result = await productByBrandListService(req);
    res.status(200).send(result)
}

exports.productBySimilerList = async (req,res) =>{
    let result = await productBySimilarListService(req);
    res.status(200).send(result)
}

exports.productDetailsList = async (req,res) =>{
    let result = await productDetailsService(req);
    res.status(200).send(result)
}
exports.productRemarkList = async (req,res) =>{
    let result = await productByRemarkListService(req);
    res.status(200).send(result)
}
exports.productSearchList = async (req,res) =>{
    let result = await productKeywordService(req);
    res.status(200).send(result)
}





















