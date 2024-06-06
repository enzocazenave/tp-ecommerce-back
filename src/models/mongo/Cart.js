const { model, Schema } = require('mongoose')

const CartProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false })

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: {
    type: [CartProductSchema],
    default: []
  }
})

const CartModel = model('Cart', CartSchema)

CartModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = CartModel