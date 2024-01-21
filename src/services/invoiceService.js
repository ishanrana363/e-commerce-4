const axios = require("axios");
const FormData = require('form-data');
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

      let invoice_id = createInvoice["_id"]

      //========================(5) Invoice product create==============================================================

      cartsProduct.forEach(async (element)=>{
          await invoiceproductsModel.create({
              userID : user_id ,
              invoiceID : invoice_id,
              productID : element["productID"] ,
              qty : element["qty"],
              price : element["product"]["discount"]?element["product"]["discountPrice"]:element["product"]["price"],
              color : element["color"],
              size : element["size"],
          })
      })

      // delete carts

      await cartModel.deleteMany({userID:user_id})

      // =================================//(৬)  prepare ssl payment=======================================
      let PaymentSettings=await paymentSettingModel.find();


      const from= new FormData()
      from.append('store_id',PaymentSettings[0]['store_id'])
      from.append('store_passwd',PaymentSettings[0]['store_passwd'])
      from.append('total_amount',total.toString())
      from.append('currency',PaymentSettings[0]['currency'])
      from.append('tran_id',tran_id)

      from.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
      from.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
      from.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
      from.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

      from.append('cus_name',Profile[0]["cus_name"])
      from.append('cus_email',email)
      from.append('cus_add1',Profile[0]['cus_add'])
      from.append('cus_add2',Profile[0]['cus_add'])
      from.append('cus_city',Profile[0]['cus_city'])
      from.append('cus_state',Profile[0]['cus_state'])
      from.append('cus_postcode',Profile[0]['cus_postcode'])
      from.append('cus_country',Profile[0]['cus_country'])
      from.append('cus_phone',Profile[0]['cus_phone'])
      from.append('cus_fax',Profile[0]['cus_phone'])
      //
      from.append('shipping_method',"YES")
      from.append('ship_name',Profile[0]['ship_name'])
      from.append('ship_add1',Profile[0]['ship_add'])
      from.append('ship_add2',Profile[0]['ship_add'])
      from.append('ship_city',Profile[0]['ship_city'])
      from.append('ship_state',Profile[0]['ship_state'])
      from.append('ship_country',Profile[0]['ship_country'])
      from.append('ship_postcode',Profile[0]['ship_postcode'])

      from.append('product_name','According Invoice')
      from.append('product_category','According Invoice')
      from.append('product_profile','According Invoice')
      from.append('product_amount','According Invoice')
      const sslRes = await axios.post(PaymentSettings[0]["init_url"],from)
      return {
          status:"success", data : sslRes.data
      }


  }catch (e) {
      return {
          status:"fail",message : e.toString()
      };
  }
};

const paymentSuccessService = async (req) => {
    try{
        let trxID=req.params.trxID;
        await  invoiceModel.updateOne({tran_id:trxID},{payment_status:"success"});
        return {status:"success"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
};

const paymentFailService = async (req) => {
    try {
        let trexId = req.params.tranId;
        await invoiceModel.updateOne({tran_id:trexId},{payment_status:"fail"});
        return {
            status:"fail"
        }
    }catch (e) {
        return {
            status:"fail",message : e.toString()
        };
    }
};

const paymentCancelService = async (req) => {
    try {
        let trexId = req.params.tranId;
        await invoiceModel.updateOne({tran_id:trexId},{payment_status:"cancel"});
        return {
            status:"fail"
        }
    }catch (e) {
        return {
            status:"fail",message : e.toString()
        };
    }
};

const paymentIpnService = async (req)=>{
    try {
        let trexId = req.params.tranId;
        let status = req.body["status"];
        await invoiceModel.updateOne({tran_id:trexId},{payment_status:status});
    }catch (e) {
        return {
            status:"fail",message : e.toString()
        };
    }
};




module.exports = {
    createInvoiceService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelService
}