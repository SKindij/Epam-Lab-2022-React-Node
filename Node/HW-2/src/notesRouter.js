// notesRouter.js
const express = require('express');
const router = express.Router();
// цей файл відповідає за маршрутизацію запитів, пов'язаних з нотатками
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  updateNoteStatus} = require('./notesService.js');

// відповідає за аутентифікацію користувача
const {authMiddleware} = require('./middleware/authMiddleware');

router.post('/', authMiddleware, createNote);

router.get('/', authMiddleware, getNotes);

router.get('/:id', authMiddleware, getNote);

router.put('/:id', authMiddleware, updateNote);

router.patch('/:id', authMiddleware, updateNoteStatus);

router.delete('/:id', authMiddleware, deleteNote);

module.exports = {
  notesRouter: router,
};
