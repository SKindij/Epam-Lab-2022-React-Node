// actionCreators.js
/*
Цей файл містить функції-генератори дій (action creators) для Redux. Вони створюють дії, які виконуються в додатку. 
Дії це об'єкти, які містять тип (type) та опціональний payload (дані, які передаються разом з дією). 
Основна мета цих функцій - створити ці дії з певними типами та даними, які будуть використовуватися в редукторах для зміни стану додатку.
*/
import {
	ADD_INITIAL_AUTHORS,
	ADD_ONE_POOL_AUTHOR,	UPDATE_POOL_AUTHORS,
	GET_INITIAL_AUTHORS,	GET_POOL_AUTHORS,
	UPDATE_ALL_AUTHORS,	GET_ALL_AUTHORS,
	ADD_ALL_AUTHORS,	ADD_POOL_AUTHORS_ARRAY,
} from './actionTypes';

// для додавання початкового списку авторів до стану
export const addInitialAuthors = (payload) => ({
	type: ADD_INITIAL_AUTHORS,
	payload,
});
// для отримання початкового списку авторів з сервера
export const getInitialAuthors = (payload) => ({
	type: GET_INITIAL_AUTHORS,
	payload,
});
// для додавання одного автора
export const addOnePoolAuthor = (payload) => ({
	type: ADD_ONE_POOL_AUTHOR,
	payload,
});
// для додавання масиву авторів
export const addPoolAuthorsArray = (payload) => ({
	type: ADD_POOL_AUTHORS_ARRAY,
	payload,
});
// для оновлення списку доступних авторів
export const updatePoolAuthors = (payload) => ({
	type: UPDATE_POOL_AUTHORS,
	payload,
});
// для отримання списку доступних авторів
export const getPoolAuthors = (payload) => ({
	type: GET_POOL_AUTHORS,
	payload,
});
// для оновлення всього списку авторів у стані
export const updateAllAuthors = (payload) => ({
	type: UPDATE_ALL_AUTHORS,
	payload,
});
// для отримання всього списку авторів із стану
export const getAllAuthors = (payload) => ({
	type: GET_ALL_AUTHORS,
	payload,
});
// для додавання списку авторів до загального списку у стані
export const addAllAuthors = (payload) => ({
	type: ADD_ALL_AUTHORS,
	payload,
});
/*
Кожен тип дії вказує редукторам, яку саме операцію вони повинні виконати при обробці цієї дії.
*/
