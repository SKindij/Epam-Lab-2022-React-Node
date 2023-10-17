const mongoose = require('mongoose');

// Створення моделі користувача з вказанням полів
const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports = {
  User,
};
