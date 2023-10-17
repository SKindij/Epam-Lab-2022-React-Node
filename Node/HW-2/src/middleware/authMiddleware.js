// authMiddleware.js
/*
  Цей файл представляє собою Middleware для автентифікації користувача, 
  який перевіряє наявність та валідність JWT-токенів в заголовку запиту. 
*/
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Отримуємо значення заголовка 'Authorization' з запиту
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({'message': 'Please, provide authorization header'});
  }
  // Розділяємо заголовок на частини, вилучаючи токен
  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401)
        .json({'message': 'Please, include token to request'});
  }

  try {
	// Розшифровуємо токен за допомогою ключа і отримуємо його вміст
    const tokenPayload = jwt.verify(token, 'secret-jwt-key');
	// Додаємо інформацію про користувача до об'єкта запиту (req)
    req.user = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
    };
	// Викликаємо наступний обробник, означаючи успішну автентифікацію
    next();
  } catch (err) {
    return res.status(401).json({message: err.message});
  }
};

module.exports = {
  authMiddleware,
};
