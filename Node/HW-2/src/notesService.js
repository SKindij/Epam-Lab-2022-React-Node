// notesService.js
// Підключення моделі для нотаток
const {Note} = require('./models/Notes.js');

// Функція для створення нової нотатки
function createNote(req, res, next) {
  try {
    const {text} = req.body;
	// створюємо екземпляр нової нотатки
    const note = new Note({
      text,
	  // Прив'язка нотатки до конкретного користувача
      userId: req.user.userId,
    });
    // збереження нотатки в базі даних
    note.save().then((saved) => {
	  // відправляємо відповідь клієнту у форматі JSON
      res.json({
        message: 'Success', // операція була успішною
        saved, // містить інформацію про збережену нотатку
      });
    });
  } catch (err) {
    if (err) throw err;
  }
}

// Функція для отримання списку нотаток
function getNotes(req, res, next) {
  // витягуємо параметри із запиту клієнта
  const {offset, limit} = req.query;
  try {
	// шукає всі нотатки, які належать користувачеві в базі даних MongoDB
    Note.find({userId: req.user.userId}).then((result) => {
	  // обмежує кількість нотаток відповідно до значення offset або нуль
      result = result.slice(offset || 0);
      result.length = limit || result.length;
      // відправляємо відповідь клієнту
      res.json({
        'offset': offset || 0,
        'limit': limit || 'no limit',
        'count': result.length,
        'notes': result,
      });
    });
  } catch (err) {
    if (err) throw err;
  }
}

// Функція для отримання окремої нотатки за ідентифікатором
const getNote = (req, res, next) => {
  // виклик в базі даних MongoDB шукає нотатку, яка відповідає двом критеріям
  try {
	// userId повинен відповідати ідентифікатору користувача  з JWT-токена
	// _id - це ідентифікатор нотатки
    Note.find({userId: req.user.userId, _id: req.params.id})
	  // нотатка знаходиться в результаті
      .then((result) => {
        if (result.length === 0) {
          return res.status(400)
            .send({message: `No ${req.user.username} notes with this id`});
        }
          res.json({note: result[0]});
      });
  } catch (err) {
    if (err) throw err;
  }
};

// Функція для оновлення нотатки
const updateNote = async (req, res, next) => {
  try {
	// пробуємо знайти нотатку, яку користувач бажає оновити
    const note = await Note.findOne({userId: req.user.userId, _id: req.params.id});
      if (!note) {
        // Якщо нотатку не знайдено, ви можете повернути відповідь, наприклад, 404 Not Found.
        return res.status(404).json({ message: 'Note not found' });
      }
	  console.log('Found note:', note);
	// Параметр з тіла запиту, який містить новий текст для нотатки.
    const {text} = req.body;
	  console.log('Received text:', text);
    // note оновлюється на новий текст
	if (text) note.text = text;
    // зберігаємо оновлену нотатку в базі даних
    return note.save().then((saved) =>
      res.json({message: 'Success', note: saved}));
	    console.log('Updated note:', saved);
  } catch (err) {
    console.error('An error occurred:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Функція для оновлення статусу нотатки (виконано/не виконано)
const updateNoteStatus = async (req, res, next) => {
  try {
    const note = await Note.findOne({userId: req.user.userId, _id: req.params.id});

    if (note.completed === false) {
      note.completed = true;
    } else {
      note.completed = false;
    }

    return note.save().then((saved) =>
      res.json({message: 'Success', note: saved}));
  } catch (err) {
    console.error('An error occurred:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Функція для видалення нотатки
const deleteNote = (req, res, next) =>{
  try {
    Note.findOneAndRemove({userId: req.user.userId, _id: req.params.id})
      .then((note) => {
        if (!note) {
          return res.status(400)
            .send({message: `No ${req.user.username} notes with this id`});
        }

        res.status(200)
          .send({message: `Note ${req.params.id} successfully deleted`});
      });
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  updateNoteStatus,
  deleteNote,
};
