const { request, response } = require("express")
const { sendErrorResponse, sendSuccessResponse } = require("../adapters/http/sendResponse")
const ProductService = require('../services/product.service')

const create = async (req = request, res = response) => {
  try {
    const { name, description, multimedia, price } = req.body
    const response = await ProductService.create({ name, description, multimedia, price })
    sendSuccessResponse(res, 200, 'Producto creado con éxito', response)
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const get = async (req = request, res = response) => {
  try {
    const response = req.params.productId
      ? await ProductService.getProductById(req.params.productId)
      : await ProductService.get()

    sendSuccessResponse(
      res, 
      200, 
      req.params.productId 
        ? 'Producto obtenido con éxito'
        : 'Productos obtenidos con éxito',
      response
    )
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

const update = async (req = request, res = response) => {
  try {
    const productId = req.params.productId
    const { name, description, multimedia, price, auth } = req.body

    if (!name && !description && !multimedia && !price) {
      throw "Es obligatorio cambiar al menos una propiedad del producto"
    }

    const propsToUpdate = {}

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== 'auth') {
        propsToUpdate[key] = req.body[key]
      }
    })
    
    await ProductService.updateById(productId, propsToUpdate, auth.userId)
    sendSuccessResponse(res, 200, 'Producto actualizado con éxito', {})
  } catch(error) {
    sendErrorResponse(res, 400, error)
  }
}

module.exports = {
  create,
  get,
  update
}