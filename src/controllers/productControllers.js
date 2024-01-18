const {
    productSliderService,
    productCategoryService

} =require("../services/productService");


exports.productSliderList = async (req,res) =>{
    let result = await productSliderService();
    res.status(200).send(result)
}
exports.productCategoryList = async (req,res) =>{
    let result = await productCategoryService();
    res.status(200).send(result)
}


