// initialAuthorsReducer.js
/*
Цей файл містить редуктор для обробки дій, пов'язаних з початковим списком авторів у Redux сторі. 
Редуктор приймає поточний стан та дію, і на основі типу дії виконує відповідну операцію над станом.
*/
import { ADD_INITIAL_AUTHORS, GET_INITIAL_AUTHORS } from './actionTypes';
// початковий стан для редуктора, спочатку список порожній
const defaultState = {
	initialAuthors: [],
};
// сам редуктор, який обробляє дії відповідно до їх типу
export const initialAuthorsReducer = (state = defaultState, action) => {
  // для перевірки типу дії, яку він отримав
	switch (action.type) {
		case ADD_INITIAL_AUTHORS:
      // повертає новий стан, додавши до поточного списку initialAuthors дані, які передаються через action.payload
			// це робиться, створюючи новий масив, який містить старі та нові дані
      return {
				...state,
				initialAuthors: [...state.initialAuthors, action.payload],
			};
		case GET_INITIAL_AUTHORS:
      //  оновлює список initialAuthors новими даними, які передаються через action.payload
      // це робиться, створюючи новий масив
			return {
				...state,
				initialAuthors: [...action.payload],
			};
		default:
      // якщо тип дії не відповідає жодному з case, то редуктор просто повертає поточний стан без змін
			return state;
	}
};
/*
цей редуктор відповідає за обробку дій, пов'язаних з початковим списком авторів. 
Він може додавати нових авторів до списку та оновлювати його на основі отриманих даних
*/
