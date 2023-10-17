// authRouter.js
const express = require('express');
// Створення об'єкту роутера
const router = express.Router();
// Підключення функцій реєстрації та входу користувача
const {registerUser, loginUser} = require('./authService.js');

// Визначення маршруту, який викликає функцію 'registerUser'
router.post('/register', registerUser);

// Визначення маршруту, який викликає функцію 'loginUser'
router.post('/login', loginUser);

module.exports = {
  authRouter: router,
};
