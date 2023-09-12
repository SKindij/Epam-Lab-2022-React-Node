// thunk.js
/*
Цей файл містить дію (thunk), яка відповідає за додавання одного автора. 
Використання thunks дозволяє виконувати асинхронні операції та взаємодіяти з Redux-стором під час їх виконання. 
*/
import { addOnePoolAuthor, addInitialAuthors } from './actionCreators';
// функція для додавання одного автора
export const addOneAuthor = (authData) => {
  // отримуємо токен користувача з локального сховища
	const token = localStorage.getItem('userTocken');
  // перевіряємо, чи існує токен. Якщо немає, кидаємо помилку.
	if (!token) throw new Error('User is not logged in');
  // повертаємо асинхронну функцію, яка буде виконана в Redux Thunk
	return async (dispatch) => {
    // відправляємо запит на сервер для додавання нового автора
		const result = await fetch(`http://localhost:4000/authors/add`, {
			method: 'POST',
			body: JSON.stringify(authData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
    // розпаковуємо відповідь сервера у форматі JSON
		const json = await result.json();
    // перевіряємо, чи було додано автора успішно
		if (json.successful) {
      // диспетчеризуємо дію для додавання автора до "басейну" доступних авторів
			dispatch(addOnePoolAuthor(json.result));
      // диспетчеризуємо дію для додавання автора до початкового списку авторів
			dispatch(addInitialAuthors(json.result));
		} else {
			console.log('Unable to fetch addOneAuthor!');
		}
	};
};
