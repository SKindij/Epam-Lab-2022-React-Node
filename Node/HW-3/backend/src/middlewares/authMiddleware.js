// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken')
const { getUserByID } = require('../services/usersService')

// Middleware для автентифікації користувача за JWT-токеном
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers
  // перевірка наявності заголовка "Authorization" в запиті
    if (!authorization) {
      return res
        .status(400)
        .json({ message: 'Please, provide authorization header' })
    }
  /*
    зазвичай "Authorization" виглядає так: "Bearer [JWT-токен]"
    .split(' ') розділяє цей рядок на дві частини
	token отримує значення JWT-токену, яке було передано в запиті
  */
  const token = authorization.split(' ')[1]
    if (!token) {
      return res
        .status(400)
        .json({ message: 'Please, include token to request' })
    }

  /*
  розкодування токена, отримання інформації про користувача з нього
    token: JWT-токен, який користувач передав у заголовку авторизації запиту
    секретний ключ використовується для підпису і перевірки JWT-токена
    метод jwt.verify перевіряє підпис токена
  */
  const tokenPayload = jwt.verify(token, process.env.SECRET_JWT_KEY)
    /*
	  зазвичай у токені містяться дані користувача, 
	  такі як userID та/або role
      ми витягуємо значення userID із розкодованого JWT-токену
	  та отримуємо користувача із бази даних
	*/
    const user = await getUserByID(tokenPayload.userID)
      if (!user) { throw Error("User doesn't exist") }
  // додавання об'єкта користувача до об'єкта запиту
  req.user = {
    _id: tokenPayload.userID,
    role: tokenPayload.role,
    email: tokenPayload.email,
    created_date: tokenPayload.created_date
  }

  next()
}

module.exports = {
  authMiddleware
}
