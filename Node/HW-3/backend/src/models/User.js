// models/User.js
const mongoose = require('mongoose') // для роботи з MongoDB
const Joi = require('joi') // для валідації даних користувача

// створення Joi-схеми для валідації даних користувача
const userJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
    .required(),
  role: Joi.string()
    .pattern(new RegExp('^SHIPPER|DRIVER$'))
    .required()
})

// опис схеми користувача для збереження в базі даних
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    require: true
  },
  created_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  image: {
    type: String
  }
})

// створення моделі користувача на основі схеми
const User = mongoose.model('users', userSchema)

module.exports = {
  User,
  userJoiSchema
}
