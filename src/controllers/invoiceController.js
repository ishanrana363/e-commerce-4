const {
    createInvoiceService
} = require("../services/invoiceService");

exports.invoiceCreate = async (req,res)=>{
    let result = await createInvoiceService(req);
    res.status(201).send(result)
}