const { CartModel: Cart } = require("../models/mongo/Cart")
const CartRecord = require("../models/mongo/CartRecord")
const Record = require("../models/mongo/Record")

const getRecordsByProductId = async (productId) => {
  try {
    const product = await Record.find({ productId })
    return product
  } catch(error) {
    throw error
  }
}

const getCartRecords = async(userId) => {
  try {
    const cart = await Cart.findOne({ userId })
    const cartRecords = await CartRecord.find({ cartId: cart._id })
    return cartRecords
  } catch(error) {
    throw error
  }
}

const returnToPreviousStatuses = async (userId, cartRecordId) => {
  try {
    const cart = await Cart.findOne({ userId })

    if (!cart) {
      throw `El usuario ${userId} no posee un carrito creado`
    }

    const cartRecord = await CartRecord.findById(cartRecordId)

    if (!cartRecord) {
      throw `El estado de carrito ${cartRecordId} no existe`
    }

    cart.products = cartRecord.beforeActivity
    await cart.save()
  } catch(error) {
    throw error
  }
}

module.exports = {
  getRecordsByProductId,
  getCartRecords,
  returnToPreviousStatuses
}