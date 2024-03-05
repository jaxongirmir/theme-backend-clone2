const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  fullName: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  information: { type: String, default: 'Your accaunt is empty' },
  role: [{ type: String, default: ['STUDENT'] }],
  status: { type: Number, default: 0 },
  addedTime: { type: Number, default: new Date() },
})

const userModel = model('user', userSchema)

module.exports = userModel
