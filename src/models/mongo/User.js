const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  },
  averageTimePerDay: {
    type: Number,
    default: 60
  }
})

const UserModel = model('User', UserSchema)

UserModel.schema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v
  }
})

module.exports = UserModel