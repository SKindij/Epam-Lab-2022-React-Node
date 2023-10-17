// index.js
const fs = require('fs'); // для роботи з файловою системою
const express = require('express'); // для створення серверу
const morgan = require('morgan'); // Middleware для логування запитів
const path = require('path'); // для роботи з шляхами файлів

const app = express(); // Створюємо екземпляр серверу Express
const mongoose = require('mongoose'); // Бібліотека для роботи з MongoDB

// Завантажуємо змінні середовища з файлу .env
require('dotenv').config(); 
// Підключаємося до бази даних Atlas MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  // Створення об'єкта підключення до бази даних
  const db = mongoose.connection;
  // Прослуховування подій з'єднання з базою даних
  db.on('error', (error) => {
    console.error(`Помилка підключення до бази даних: ${error}`);
  });

db.once('open', async () => {
  console.log('З\'єднання з Atlas MongoDB успішно встановлено');
  
  try {
    // Виконання пінгу для перевірки з'єднання
    const pingResult = await db.db.command({ ping: 1 });
      console.log(pingResult);
  } catch (error) {
    console.error(`Помилка при виконанні пінгу: ${error}`);
  }

  // Встановлюємо Middleware для роботи з JSON-даними в запитах
  app.use(express.json());

  // Встановлюємо Middleware morgan для логування запитів
  app.use(morgan('tiny', {stream: fs.createWriteStream(
    path.resolve(__dirname, 'access.log'),
    {flags: 'a'},
  )}));

  // Встановлюємо Middleware для статичних файлів в папці "frontend"
  app.use(express.static('frontend'));

  // Підключаємо роутери для обробки різних API-шляхів
  const {authRouter} = require('./authRouter.js');
  const {notesRouter} = require('./notesRouter.js');
  const {usersRouter} = require('./usersRouter.js');

  // Встановлюємо роутери для обробки різних шляхів API
  app.use('/api/auth', authRouter);
  app.use('/api/notes', notesRouter);
  app.use('/api/users/me', usersRouter);

  // Запускаємо сервер на заданому порті
  const start = async () => {
    try {
	  // починаємо прослуховувати підключення на порту
      app.listen(process.env.PORT, ()=>console.log("Запускаємо серверну програму..."));
    } catch (err) {
      console.error(`Error on server startup: ${err.message}`);
    }
  };

  start();
});

// Middleware для обробки помилок серверу
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error('err', err);
  res.status(500).send({'message': 'Server error'});
}

 /*
  npm start
  http://localhost:8080/
 */
