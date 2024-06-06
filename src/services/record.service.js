const Record = require("../models/mongo/Record")

const getRecordsByProductId = async (productId) => {
  try {
    const product = await Record.find({ productId })
    return product
  } catch(error) {
    throw error
  }
}

module.exports = {
  getRecordsByProductId
}