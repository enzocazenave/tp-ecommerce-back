const { request, response } = require("express")
const { sendErrorResponse } = require("../adapters/http/sendResponse")
const { verify } = require("jsonwebtoken")

const tokenValidator = (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) return sendErrorResponse(res, 400, 'Token de sesión no encontrado')

  try {
    const tokenPayload = verify(token, process.env.SECRET_TOKEN_KEY)
    delete tokenPayload.iat
    delete tokenPayload.exp

    req.body = { ...req.body, auth: { ...tokenPayload, token } }

    next()
  } catch(error) {
    sendErrorResponse(res, 403, 'Token de sesión expirado')
  }
}

module.exports = tokenValidator