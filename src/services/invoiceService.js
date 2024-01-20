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
      let delivery_charge = 120;
      let vat = totalAmount * 0.05;   // 5% vat
      const total = totalAmount + vat + delivery_charge;

      //(2) =========================// Prepared cus_details & ship_details======================


      const Profile = await profileModel.aggregate([ matchStage]);

      let cus_details = ` Name : ${Profile[0]["cus_name"]}, Email : ${email}, Address : ${Profile[0]["cus_add"]},
      PhoneNumber : ${Profile[0]["cus_phone"]}, City : ${Profile[0]["cus_city"]}` ;

      let ship_details = ` Name : ${Profile[0]["ship_name"]}, Address : ${Profile[0]["ship_add"]},
      PhoneNumber : ${Profile[0]["ship_phone"]}, City : ${Profile[0]["ship_city"]}`

        // (3)=================================== Create Transition & other ids=========================================

      let tran_id = Math.floor(1000000000+ Math.random() *9000000000);
      let val_id = 0;
      let delivery_status = "Pending";
      let payment_status = "Pending";

      // (4)=================================== Create Invoice =========================================

      let createInvoice = await invoiceModel.create({
          userID : user_id,
          payable : totalAmount,
          cus_details : cus_details,
          ship_details : ship_details,
          tran_id : tran_id,
          val_id : val_id,
          delivery_status : delivery_status ,
          payment_status : payment_status,
          vat : vat,
          delivery_charge:delivery_charge,
          total :total
      })

      return{
          status:"success",data : createInvoice
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