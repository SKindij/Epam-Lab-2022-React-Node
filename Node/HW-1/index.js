// index.js
// для роботи з файловою системою
const fs = require('fs');
const path = require('path');
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
// запускаємо сервер на порту 8080 або іншому, якщо потрібно
const PORT = process.env.PORT || 8080;
// створюємо потік для запису логів HTTP-запитів у файл
const accessedLog = fs.createWriteStream(path.join(__dirname, 'requestLogs.log'), {flags: 'a'});

// додаємо два middleware до нашого Express додатку
// розбирає тіло запиту з JSON-формату та робить його доступним у вигляді об'єкта req.body
app.use(express.json());
// логи мають бути направлені у окремий файл
app.use(morgan('combined', { stream: accessedLog }));

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
    // запускаємо сервер на порту PORT
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
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
  res.status(err.status).send({'message': err.message});
}
