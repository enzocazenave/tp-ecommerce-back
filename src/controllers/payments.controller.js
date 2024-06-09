const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const PaymentService = require('../services/payments.service')

const payOrder = async(req = request, res = response) => {
  try {
    const { auth: { userId }, paymentMethod } = req.body
    const { orderId } = req.params
    const response = await PaymentService.payOrder(orderId, userId, paymentMethod)
    sendSuccessResponse(res, 200, `La orden fue pagada correctamente`, response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  payOrder
}