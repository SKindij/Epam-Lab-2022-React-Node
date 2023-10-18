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
  const {offset, limit} = req.query;

  try {
    Note.find({userId: req.user.userId}).then((result) => {
      // if (result.length === 0) {
      //  return res.status(400).send({message: `No notes to show`});
      // }
      result = result.slice(offset || 0);
      result.length = limit || result.length;

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
  try {
    Note.find({userId: req.user.userId, _id: req.params.id})
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
    const note = await Note.find({userId: req.user.userId, _id: req.params.id});

    const {text} = req.body;

    if (text) note[0].text = text;

    return note[0].save().then((saved) =>
      res.json({message: 'Success', note: saved}));
  } catch (err) {
    if (err) throw err;
  }
};

// Функція для оновлення статусу нотатки (виконано/не виконано)
const updateNoteStatus = async (req, res, next) => {
  try {
    const note = await Note.find({userId: req.user.userId, _id: req.params.id});

    if (note[0].completed === false) {
      note[0].completed = true;
    } else {
      note[0].completed = false;
    }

    return note[0].save().then((saved) =>
      res.json({message: 'Success', note: saved}));
  } catch (err) {
    if (err) throw err;
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
