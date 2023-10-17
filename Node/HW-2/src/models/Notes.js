// Підключення бібліотеки для роботи з MongoDB
const mongoose = require('mongoose');

// Створення схеми (структури) для моделі записів (нотаток)
const noteSchema = mongoose.Schema({
  // Поле, яке містить ідентифікатор користувача, який створив нотатку
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Вказуємо тип поля для посилання на об'єкт користувача
    ref: 'User', // Вказуємо, що це поле посилається на модель 'User', тобто на користувача
  },
  // Поле, яке показує, чи нотатка була завершена (виконана)
  completed: {
    type: Boolean,
    default: false,
  },
  // Поле, яке містить текст нотатки
  text: {
    type: String,
    required: true,
  },
  // Поле, яке містить дату створення нотатки
  createdDate: {
    type: Date,
    default: Date.now,
  },

});

// Створення моделі "Note" на основі схеми "noteSchema"
const Note = mongoose.model('Note', noteSchema);

module.exports = {
  Note,
};
