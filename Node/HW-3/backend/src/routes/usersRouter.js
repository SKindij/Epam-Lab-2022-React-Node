// routes/usersRouter.js
const express = require('express')
const router = express.Router()
const {
  getUserInfo, deleteUser,
  updatePassword, saveUserAvatar, getUserAvatar
} = require('../controllers/usersController')
const {
  passwordMiddleware
} = require('../middlewares/passwordMiddleware')

// для обробки завантаження файлів та налаштування шляху їх збереження
const multer = require('multer')
const upload = multer({ dest: 'src/uploads/' })

const { asyncWrapper } = require('../asyncWrapper')

// маршрут для отримання інформації про користувача
router.get('/', asyncWrapper(getUserInfo))

// маршрут для видалення профілю користувача
router.delete('/', asyncWrapper(deleteUser))

// маршрут для завантаження аватарки користувача
router.post(
  '/image',
  upload.single('avatar'),
  asyncWrapper(saveUserAvatar)
)

// маршрут для оновлення паролю користувача
router.patch(
  '/password',
  asyncWrapper(passwordMiddleware),
  asyncWrapper(updatePassword)
)

// маршрут для отримання аватарки користувача
router.get('/image', asyncWrapper(getUserAvatar))

module.exports = {
  usersRouter: router
}
