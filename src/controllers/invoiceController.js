const {
    createInvoiceService,
    paymentSuccessService,
    paymentCancelService,
    paymentFailService,
    paymentIpnService

} = require("../services/invoiceService");

exports.invoiceCreate = async (req,res)=>{
    let result = await createInvoiceService(req);
    res.status(201).send(result)
}

exports.paymentSuccess = async (req,res)=>{
    let result = await paymentSuccessService(req);
    res.status(200).send(result)
}
exports.paymentFail = async (req,res)=>{
    let result = await paymentFailService(req);
    res.status(200).send(result)
}
exports.paymentCancel = async (req,res)=>{
    let result = await paymentCancelService(req);
    res.status(200).send(result)
};

exports.paymentIpn = async (req,res)=>{
    let result = await paymentIpnService(req);
    res.status(200).send(result)
}