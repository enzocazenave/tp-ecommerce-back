const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const RecordService = require('../services/record.service')

const getRecordsByProductId = async (req = request, res = response) => {
  try {
    if (!req.params.productId) {
      throw ""
    }

    const response = await RecordService.getRecordsByProductId(req.params.productId)
    sendSuccessResponse(res, 200, `Registro de actividades del producto ${req.params.productId} obtenidos con éxito`, response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const getCartRecords = async (req = request, res = response) => {
  try {
    const { userId } = req.body.auth
    const response = await RecordService.getCartRecords(userId)
    sendSuccessResponse(res, 200, `Registro de actividades del carrito del usuario ${userId} obtenido con éxito`, response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  getRecordsByProductId,
  getCartRecords
}