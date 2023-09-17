// index.js
// для роботи з файловою системою
const fs = require('fs');
// для створення веб-сервера
const express = require('express');
// для логування запитів
const morgan = require('morgan')
/*
  створюємо екземпляр нашого веб-сервера на базі Express, 
  який буде використовувати для налаштування роутів та запуску сервера
*/
const app = express();
// підключаємо роутер для обробки запитів, пов'язаних з файлами
const { filesRouter } = require('./filesRouter.js');

// додаємо два middleware до нашого Express додатку
// розбирає тіло запиту з JSON-формату та робить його доступним у вигляді об'єкта req.body
app.use(express.json());
// в консолі надає короткі записи для кожного запиту
app.use(morgan('tiny'));

/*
  Вказуємо додатку використовувати роутер "filesRouter" для обробки всіх запитів, 
  які приходять на шлях "/api/files".
  Це організовує логіку маршрутизації для файлів.
*/
app.use('/api/files', filesRouter);


const start = async () => {
  try {
    // якщо папка "files" не існує, то створюємо її;
    if (!fs.existsSync('files')) {
      fs.mkdirSync('files');
    }
    // запускаємо сервер на порту 8080
    app.listen(8080);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
}
// запуск сервера
start();

//ERROR HANDLER
// цей middleware використовується для обробки помилок
app.use(errorHandler)

function errorHandler (err, req, res, next) {
  console.error('err')
  res.status(500).send({'message': 'Server error'});
}
