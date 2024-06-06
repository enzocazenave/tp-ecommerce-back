const { model, Schema } = require('mongoose')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  multimedia: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true
  }
})

const ProductModel = model('Product', ProductSchema)

ProductModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = ProductModel