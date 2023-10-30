// controllers/authController.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// підключаємо схему з моделі для валідації даних користувача
const { userJoiSchema } = require('../models/User')

// сервіс для відновлення паролю
const {
  getNewGeneratedPassword,
  sendEmailWithNewPassword
} = require('../services/authService')
// сервіс взаємодії з базою даних
const {
  saveUser,
  getUserByEmail,
  findUserByEmailAndUpdate
} = require('../services/usersService')

// для реєстрації нового користувача
const registerUser = async (req, res, next) => {
  // отримуємо дані із форми запиту
  const { email, password, role } = req.body
  // валідація вхідних даних за допомогою схеми
  await userJoiSchema.extract(['email']).validateAsync(email)
  await userJoiSchema.extract(['password']).validateAsync(password)
  await userJoiSchema.extract(['role']).validateAsync(role)
  // збереження нового користувача в базу даних
  await saveUser({ email, password, role })
  return res
    .status(200)
    .json({ message: 'Profile created successfully' })
}

// функція призначена для входу користувача в систему
const loginUser = async (req, res, next) => {
  // отримуємо дані із форми запиту
  const { email, password } = req.body
    // валідація вхідних даних за допомогою схеми
    await userJoiSchema.extract(['email']).validateAsync(email)
	await userJoiSchema.extract(['password']).validateAsync(password)
      // пошук користувача за email
      const user = await getUserByEmail(email)
  if (!user) {
    throw Error(`User doesn't exist`)
  }
  // валідація паролю шляхом порівняння хешу
  const isPasswordCorrect = await bcrypt.compare(
    String(password),
    String(user.password)
  )
  if (!isPasswordCorrect) { throw Error('Invalid password') }
  // створення JWT-токена для користувача
  const payload = {
    email: user.email,
    userID: user._id,
    role: user.role,
    created_date: user.created_date
  }
  const jwt_token = jwt.sign(payload, process.env.SECRET_JWT_KEY)

  return res.status(200).json({
    jwt_token,
    role: user.role
  })
}

// призначена для відновлення паролю користувача
const restorePassword = async (req, res, next) => {
  const { email } = req.body
    await userJoiSchema.extract(['email']).validateAsync(email)
  // пошук користувача за email
  const user = await getUserByEmail(email)
    if (!user) { throw Error(`User doesn't exist`) }
  // генерація нового паролю та його шифрування
  const newPassword = getNewGeneratedPassword()
    const newCryptedPassword = await bcrypt.hash(newPassword, 10)
  // оновлення паролю користувача в базі даних
  await findUserByEmailAndUpdate(email, {
    password: newCryptedPassword
  })
  // відправлення нового паролю на email
  await sendEmailWithNewPassword(email, newPassword)
  return res.status(200).json({
    message:
      'New password sent to your email address. Check spam folder.'
  })
}

module.exports = {
  registerUser,
  loginUser,
  restorePassword
}
