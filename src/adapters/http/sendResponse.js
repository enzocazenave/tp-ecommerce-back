const { response } = require("express")

const sendSuccessResponse = (res = response, statusCode, message = '', data = {}) => {
  res.status(statusCode).json({
    ok: true,
    status: statusCode,
    message,
    error: null,
    data
  })
}

const sendErrorResponse = (res = response, statusCode, error = "") => {
  res.status(statusCode).json({
    ok: false,
    status: statusCode,
    message: null,
    error: error,
    data: null
  })
}

module.exports = {
  sendSuccessResponse,
  sendErrorResponse
}