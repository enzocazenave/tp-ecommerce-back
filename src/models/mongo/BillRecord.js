const { model, Schema } = require('mongoose')

const BillRecordSchema = new Schema({
  orderId: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    default: 'Caja'
  },
  billedAt: {
    type: Date,
    required: true
  }
})

const BillRecordModel = model('BillRecord', BillRecordSchema)

BillRecordModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = BillRecordModel