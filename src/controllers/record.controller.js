const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const RecordService = require('../services/record.service')

const get = async (req = request, res = response) => {
  try {
    const response = await RecordService.getRecordsByProductId(req.params.productId)
    sendSuccessResponse(res, 200, `Registro de actividades del producto ${req.params.productId} obtenidos con éxito`, response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  get
}