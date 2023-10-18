// usersRouter.js
// у файлі визначено роутер, який обробляє HTTP-запити для роботи з користувачами
const express = require('express');
const router = express.Router();
const {showUser, deleteUser, updateUser} = require('./usersService.js');
const {authMiddleware} = require('./middleware/authMiddleware');

/*
  Кожен маршрут використовує Middleware authMiddleware, що гарантує, 
  що запити будуть оброблятися тільки для авторизованих користувачів (які мають валідний JWT-токен).
*/

// Маршрут для отримання інформації про користувача
router.get('/', authMiddleware, showUser);
// Маршрут для видалення користувача
router.delete('/', authMiddleware, deleteUser);
// Маршрут для оновлення паролю користувача
router.patch('/', authMiddleware, updateUser);

module.exports = {
  usersRouter: router,
};
