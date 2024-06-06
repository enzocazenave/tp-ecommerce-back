const { request, response } = require("express")
const { sendErrorResponse } = require("../adapters/http/sendResponse")

const isOperatorUser = (req = request, res = response, next) => {
  const { role } = req.body.auth

  if (role === 2) {
    return sendErrorResponse(res, 401, 'No tienes permisos para realizar esta acción')
  }

  next()
}

module.exports = isOperatorUser