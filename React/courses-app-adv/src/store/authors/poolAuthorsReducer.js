// poolAuthorsReducer.js
// Цей код містить два редуктори для обробки дій в Redux, пов'язаних із списками авторів.
import {
	ADD_ONE_POOL_AUTHOR,	UPDATE_POOL_AUTHORS,	GET_POOL_AUTHORS,
	ADD_ALL_AUTHORS,	UPDATE_ALL_AUTHORS,	GET_ALL_AUTHORS,	ADD_POOL_AUTHORS_ARRAY,
} from './actionTypes';
// початковий стан для цього редуктора містить порожній масив
const defaultState = {
	poolAuthors: [],
};

const defaultAllAuthors = {
	allCurrentAuthors: [],
};
// редуктор обробляє дії, пов'язані зі списком "басейну" доступних авторів
export const poolAuthorsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_ONE_POOL_AUTHOR:
			return {
				...state,
				poolAuthors: [...state.poolAuthors, action.payload],
			};
		case ADD_POOL_AUTHORS_ARRAY:
			return {
				...state,
				poolAuthors: [...state.poolAuthors, ...action.payload],
			};
		case UPDATE_POOL_AUTHORS:
			return {
				...state,
				poolAuthors: [...action.payload],
			};
		case GET_POOL_AUTHORS:
			return {
				...state,
				poolAuthors: [...action.payload],
			};
		default:
			return state;
	}
};
// редуктор обробляє дії, пов'язані зі списком всіх поточних авторів
export const allCurrentAuthors = (state = defaultAllAuthors, action) => {
	switch (action.type) {
		case ADD_ALL_AUTHORS:
			return {
				...state,
				allCurrentAuthors: [...state.poolAuthors, action.payload],
			};
		case UPDATE_ALL_AUTHORS:
			return {
				...state,
				allCurrentAuthors: [...action.payload],
			};
		case GET_ALL_AUTHORS:
			return {
				...state,
				allCurrentAuthors: [...action.payload],
			};
		default:
			return state;
	}
};
/*
Обидва редуктори використовують зразок "запит-відповідь" для оновлення стану на основі отриманих даних. 
Редуктори копіюють поточний стан та змінюють його, додавши або оновлюючи дані з дії.
*/
