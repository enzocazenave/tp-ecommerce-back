const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const OrderService = require('../services/order.service')


const createOrder = async(req = request, res = response) => {
  try {
    const { userId } = req.body.auth
    const response = await OrderService.createOrder(userId)
    sendSuccessResponse(res, 200, 'Orden creada con éxito', response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  createOrder
}