const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const AuthService = require('../services/auth.service')

const register = async (req = request, res = response) => {
  try {
    const { name, lastName, address, dni, email, password, role } = req.body
    const response = await AuthService.register({ name, lastName, address, dni: parseInt(dni), email, password, role })
    sendSuccessResponse(res, 200, 'Usuario registrado con éxito', response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body
    const response = await AuthService.login({ email, password })
    sendSuccessResponse(res, 200, 'Sesión iniciada con éxito', response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const validate = async (req = request, res = response) => {
  sendSuccessResponse(res, 200, 'Sesión recuperada', req.body.auth)
}

module.exports = {
  register,
  login,
  validate
}