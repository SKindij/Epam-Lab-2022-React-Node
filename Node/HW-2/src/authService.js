// authService.js
const {User} = require('./models/Users.js'); // Підключення моделі користувача
const bcrypt = require('bcryptjs'); // для роботи з хешуванням паролів
const jwt = require('jsonwebtoken'); // для роботи з JWT-токенами
const salt = bcrypt.genSaltSync(10); // // Генерація "солі" для хешування паролів

// Функція для реєстрації нового користувача.
const registerUser = async (req, res, next) => {
  // Отримання імені користувача та паролю з тіла запиту
  const {username, password} = req.body;
    console.log("LOG (registerUser):", username, password);
  // створення екземпляру моделі користувача для бази даних
  const user = new User({
    username,
	// хешування паролю перед збереженням в базі даних
    password: await bcrypt.hash(password, salt),
  });
  // збереження нового об'єкта в базі даних MongoDB
  user.save()
    // відправлення відповіді з результатом реєстрації
    .then((saved) => res.json({ message: saved }))
	// обробка помилки, якщо реєстрація не вдалася
    .catch((err) => { next(err) });
};

// Функція для входу користувача
const loginUser = async (req, res, next) => {
  // Пошук користувача за іменем
  const user = await User.findOne({username: req.body.username});

  if (user && await bcrypt.compare(
      String(req.body.password), // введений користувачем пароль
      String(user.password)) // збережений в базі пароль
  ) {
	  // Створення об'єкта з користувачем та його ідентифікатором
      const payload = {username: user.username, userId: user._id};
	  // Створення JWT-токена на основі об'єкта payload
      const jwtToken = jwt.sign(payload, 'secret-jwt-key');
       // Відправлення успішної відповіді з JWT-токеном
      return res.json({message: 'Success', jwt_token: jwtToken});
    }
  // Відправлення відповіді про неавторизованого користувача
  return res.status(400).json({'message': 'Not authorized'});
};

module.exports = {
  registerUser,
  loginUser,
};
