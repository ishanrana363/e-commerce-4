const productSliderModel = require("../models/productSliderModel");
const productCategoryModel = require("../models/categoriesModel")


const productSliderService = async () =>{
    try {
        let data = await productSliderModel.find();
        return {
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
}

const productCategoryService  = async () =>{
    try {
        const data = await productCategoryModel.find();
        return{
            status:"success",
            data : data
        }
    } catch (error) {
        return{
            status : "fail",
            data : error.toString()
        }
    }
}



module.exports = {
    productSliderService,
    productCategoryService
    

}