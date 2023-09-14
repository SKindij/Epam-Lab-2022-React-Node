// Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import styles from './Login.module.css';
import { isAuthorized } from '../../context/index';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../store/user/actionCreators';
import { fetchUserRole } from '../../store/user/thunk';

const Login = () => {
  // локальний стан для зберігання даних форми
	const [loginData, setLoginData] = useState({ email: '', password: '' });
  // об'єкт історії для переходу на інші сторінки
	const router = useHistory();
  // отримання функції з контексту для зміни авторизації
	const { setAuthorization } = useContext(isAuthorized);
  // отримання функції `dispatch` для відправки дій до Redux
	const dispatch = useDispatch();
  // функція викликається при зміні полів введення форми
	const getField = (e) => {
    // оновлюємо локальний стан форми з введеними даними
		setLoginData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
  // функція викликається при натисканні на кнопку "Login"
	const loginUser = async (e) => {
    // зупиняємо стандартну поведінку форми
		e.preventDefault();
		try {
      // відправляємо POST-запит на сервер для авторизації користувача
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(loginData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
      // отримуємо відповідь в форматі JSON
			const res = await response.json();
      // перевіряємо, чи користувач був успішно авторизований
			if (res.result) {
        // зберігаємо токен у локальному сховищі та встановлюємо авторизацію
				localStorage.setItem('userTocken', res.result);
				setAuthorization(true);
        // додаємо користувача в Redux-стор
				dispatch(addUser(res.user));
				dispatch(updateUser(res));
        // перенаправляємо на сторінку курсів
				router.push('/courses');
			}
		} catch (error) {
      // обробляємо помилку під час відправки запиту
			alert(
				'We are very sorry. Something went wrong. Please try to login again'
			);
		}
    // отримання ролі користувача і зберігання її в Redux-сторі
		dispatch(fetchUserRole());
	};

	return (
		<div className={styles.loginGroup}>
			<div>
				<h2>Login</h2>
				<form onSubmit={loginUser}>
					<div>
						<label className={styles.loginLabel} htmlFor='email'>
							Email
						</label>
						<Input
							className={styles.loginInput}
							type='text'	id='email'
							name='email' value={loginData.email}
							placeholder='Enter email'
							onChange={getField}
						></Input>
					</div>
					<div>
						<label className={styles.loginLabel} htmlFor='password'>
							Password
						</label>
						<Input
							className={styles.loginInput}
							type='password'	id='password'
							name='password'	value={loginData.password}
							placeholder='Enter password'
							onChange={getField}
						></Input>
					</div>
					<div className={styles.loginBtn}>
						<Button type='submit'>Login</Button>
					</div>
					<div>
						<p className={styles.loginText}>
							If you do not have an account you can{' '}
							<Link to='/registration' className={styles.regLink}>
								Register
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
