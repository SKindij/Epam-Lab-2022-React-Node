// services.js
// необхідні actionTypes для роботи зі сторами Redux
import {	GET_INITIAL_AUTHORS,	GET_POOL_AUTHORS } from './store/authors/actionTypes';
import { GET_ALL_COURSES, GET_COURSES_LIST } from './store/courses/actionTypes';

// ф-ція виконує запит на сервер для отримання списку всіх курсів і оновлює стори з курсами
export const fetchAllCourses = () => {
	return async (dispatch) => {
		const res = fetch('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: {'Content-Type': 'application/json',},
		});
		res.then((result) => {
				return result.json();
			})
			.then((json) => {
        // оновлюємо стори зі списком всіх курсів та списком курсів для іншої функціональності
				dispatch({
					type: GET_ALL_COURSES,
					payload: json.result,
				});
				dispatch({
					type: GET_COURSES_LIST,
					payload: json.result,
				});
			});
	};
};

// ф-ція  виконує запит на сервер для отримання списку всіх авторів і оновлює стори з авторами
export const fetchPoolAuthors = () => {
	return async (dispatch) => {
		const result = await fetch('http://localhost:4000/authors/all', {
			method: 'GET',
			headers: {'Content-Type': 'application/json',},
		});
		const json = await result.json();
		if (json) {
      // оновлюємо стори зі списком всіх авторів та списком авторів для іншої функціональності
			dispatch({
				type: GET_POOL_AUTHORS,
				payload: json.result,
			});
			dispatch({
				type: GET_INITIAL_AUTHORS,
				payload: json.result,
			});
		} else {
			console.log('Unable to fetch fetchPoolAuthors!');
		}
	};
};

// ф-ція виконує запит на сервер для виходу користувача і повертає відповідь від сервера
export const userLogoutCall = async () => {
	try {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('userTocken'),
			},
		});
		return response;
	} catch (error) {
		alert('We are very sorry. Something went wrong. Please try again');
	}
};
