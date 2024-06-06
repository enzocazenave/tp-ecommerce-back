const Product = require("../models/mongo/Product")
const Record = require("../models/mongo/Record")

const create = async (product) => {
  try {
    const newProduct = new Product(product)
    await newProduct.save()

    return {
      productId: newProduct._id
    }
  } catch(error) {
    throw error
  }
}

const get = async () => {
  try {
    const products = await Product.find()
    return products
  } catch(error) {
    throw error
  }
}

const getProductById = async(productId) => {
  try {
    const product = await Product.findById(productId)

    if (!product) {
      throw `El producto con id ${productId} no existe`
    }

    return product
  } catch(error) {
    throw error
  }
}

const updateById = async(productId, newProductData, userId) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, newProductData)
    const keysToUpdate = Object.keys(newProductData)

    if (!product) {
      throw `El producto con id ${productId} no existe`
    }

    await Promise.all(keysToUpdate.map(async prop => {
      const propChangeRecord = new Record({
        productId,
        userId,
        value: prop, 
        oldValue: product[prop],
        newValue: newProductData[prop]
      })
      await propChangeRecord.save()
    }))

    await product.save()
  } catch(error) {
    throw error
  }
}

module.exports = {
  create,
  get,
  getProductById,
  updateById
}