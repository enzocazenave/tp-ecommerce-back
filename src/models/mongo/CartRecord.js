const { model, Schema } = require("mongoose")
const { CartProductSchema } = require("./Cart")

const CartRecordSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  beforeActivity: {
    type: [CartProductSchema],
    required: true
  },
  afterActivity: {
    type: [CartProductSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const CartRecordModel = model('CartRecord', CartRecordSchema)

CartRecordModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = CartRecordModel