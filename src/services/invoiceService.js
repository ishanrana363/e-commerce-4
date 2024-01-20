const axios = require("axios");
const fromData = require("form-data");
const profileModel = require("../models/profilesModel");
const invoiceModel = require("../models/invoicesModel");
const invoiceproductsModel = require("../models/invoiceproductsModel");
const paymentSettingModel = require("../models/paymentSettingModel");
const cartModel = require("../models/cartsModel");
const mongoose = require("mongoose");

const createInvoiceService = async (req) => {
  try{
      const user_id = new mongoose.Types.ObjectId(req.headers.user_id);
      const email = req.headers.email;
      const matchStage = { $match : { userID : user_id } };

      //(1) total calculate payable and vat


      const joinWithProductId = {
          $lookup : { from : "products",localField:"productID",foreignField:"_id",as:"product" }
      }

      const unwindProductId = { $unwind : "$product" }


      let cartsProduct = await cartModel.aggregate([
          matchStage,joinWithProductId,unwindProductId
      ])

      let totalAmount = 0
      cartsProduct.forEach((element)=>{
          let price;
          if (element["product"]["discount"]){
              price = parseFloat(element["product"]["discountPrice"]);
          }else {
              price = parseFloat(element["product"]["price"]);
          }

          totalAmount = totalAmount + parseFloat(element["qty"])*price;

      })

      let vat = totalAmount * 0.05;   // 5% vat
      const totalPayable = totalAmount + vat;

      //(2) =========================// Prepared cus_details & ship_details======================






      return{
          status:"success",data : Profile
      }


  }catch (e) {
      return {
          status:"fail",message : e.toString()
      };
  }
};



module.exports = {
    createInvoiceService,
}