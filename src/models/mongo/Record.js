const { model, Schema } = require('mongoose')

const RecordSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: String,
    required: true
  },
  oldValue: {
    type: Schema.Types.Mixed,
    required: true
  },
  newValue: {
    type: Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const RecordModel = model('Record', RecordSchema)

RecordModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = RecordModel