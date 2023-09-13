// thunk.js
// для взаємодії зі стором Redux
import { getUserRole } from '../user/actionCreators';

// виконує асинхронний запит на сервер для отримання ролі користувача та оновлення її в сторі
export const fetchUserRole = () => {
  // отримуємо токен користувача з локального сховища
	const token = localStorage.getItem('userTocken');
  // якщо токену немає, то викидаємо помилку
	if (!token) throw new Error('User is not logged in');
	return async (dispatch) => {
    // виконуємо асинхронний запит до сервера для отримання ролі користувача
		const result = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
    // розпаковуємо відповідь сервера в форматі JSON
		const json = await result.json();
		if (json) {
			dispatch(getUserRole(json));
		} else {
			console.log('Unable to fetch fetchUserRole!');
		}
	};
};
