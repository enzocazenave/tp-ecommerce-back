const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const BillService = require('../services/bill.service')

const getBillByOrderId = async(req = request, res = response) => {
  try {
    const { userId } = req.body.auth
    const { orderId } = req.params
    const response = await BillService.getBillByOrderId(orderId, userId)
    sendSuccessResponse(res, 200, "Orden y factura obtenida con éxito", response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  getBillByOrderId
}