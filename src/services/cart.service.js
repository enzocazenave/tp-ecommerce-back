const { CartModel: Cart } = require("../models/mongo/Cart")
const CartRecord = require("../models/mongo/CartRecord")
const Product = require("../models/mongo/Product")

const addProduct = async (product, userId) => {
  try {
    const productToAdd = await Product.findById(product.productId)

    if (!productToAdd) {
      throw `El producto ${product.productId} no existe`
    }

    let cart = await Cart.findOne({ userId }) ?? new Cart({ userId })

    const productIndex = cart.products.findIndex(p => p.productId.equals(product.productId))
    const beforeCartActivity = JSON.parse(JSON.stringify(cart.products))

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += product.quantity
    } else {
      cart.products.push({ ...product, price: productToAdd.price })
    }

    const cartRecord = new CartRecord({ cartId: cart._id, beforeActivity: beforeCartActivity, afterActivity: cart.products })

    await cartRecord.save()
    await cart.save()
  } catch(error) {
    throw error
  }
}

const getCart = async(userId) => {
  try {
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId })

      await cart.save()
    }

    return cart.products
  } catch(error) {
    throw error
  }
}

const removeProduct = async(product, userId) => {
  try {
    const productToRemove = await Product.findById(product.productId)

    if (!productToRemove) {
      throw `El producto ${product.productId} no existe`
    }

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      throw `El producto ${product.productId} no está en su carrito`
    }

    const productIndex = cart.products.findIndex(p => p.productId.equals(product.productId))

    if (productIndex === -1) {
      throw `El producto ${product.productId} no está en su carrito`
    }

    if (cart.products[productIndex].quantity - product.quantity < 0) {
      throw `No hay esa cantidad de unidades del producto ${product.productId} en el carrito`
    }
    
    const beforeCartActivity = JSON.parse(JSON.stringify(cart.products))

    cart.products[productIndex].quantity -= product.quantity
    
    if (cart.products[productIndex].quantity === 0) {
      cart.products.splice(productIndex, 1)
    }

    const cartRecord = new CartRecord({ cartId: cart._id, beforeActivity: beforeCartActivity, afterActivity: cart.products })
    
    await cartRecord.save()
    await cart.save()
  } catch(error) {
    throw error
  }
}

module.exports = {
  addProduct,
  getCart,
  removeProduct
}