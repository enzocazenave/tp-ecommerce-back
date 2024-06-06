const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const CartService = require('../services/cart.service')

const addProduct = async (req = request, res = response) => {
  try {
    const { productId, quantity, auth: { userId } } = req.body
    await CartService.addProduct({ productId, quantity }, userId)
    sendSuccessResponse(res, 200, 'Se agregó el producto al carrito con éxito')
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const removeProduct = async (req = request, res = response) => {
  try {
    const { productId, quantity, auth: { userId } } = req.body
    await CartService.removeProduct({ productId, quantity }, userId)
    sendSuccessResponse(res, 200, `Se eliminó ${quantity}x unidades del carrito con éxito`)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const getCart = async (req = request, res = response) => {
  try {
    const response = await CartService.getCart(req.body.auth.userId)
    sendSuccessResponse(res, 200, 'Carrito obtenido con éxito', response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  addProduct,
  getCart,
  removeProduct
}