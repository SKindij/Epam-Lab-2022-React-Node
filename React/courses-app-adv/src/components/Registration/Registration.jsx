// Registration.jsx
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import styles from './Registration.module.css';
// useDispatch для взаємодії з Redux-стором та addUser для додавання нового користувача
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/user/actionCreators';

const Registration = () => {
  // ініціалізуємо стан для даних реєстрації користувача
  const [regData, setRegData] = useState({ email: '', password: '' });
  // об'єкт історії для переходу на інші сторінки	
  const router = useHistory();

	const dispatch = useDispatch();
  // функція викликається при зміні полів введення форми
  const getField = (e) => {
    // відправляємо дані до Redux-стору для зберігання
    dispatch(addUser({ [e.target.name]: e.target.value }));
    // оновлюємо локальний стан форми з введеними даними
    setRegData((prevState) => ({
	...prevState,
	[e.target.name]: e.target.value,
    }));
	};
  // функція викликається при натисканні на кнопку "Submit registration"
  const registerNewUser = async (e) => {
    // зупиняємо стандартну поведінку форми при натисканні кнопки
	e.preventDefault();
	try {
	  // відправляємо POST-запит на сервер для реєстрації користувача
	  const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(regData),
		headers: {'Content-Type': 'application/json',},
	  });
	  // отримуємо відповідь в форматі JSON
	  const res = await response.json();
          // після успішної реєстрації перенаправляємо користувача на сторінку входу
	  if (res.successful === true) {
	    router.push('/login');
	  // якщо реєстрація не вдалася, виводимо повідомлення про помилку	  
	  } else {
	    alert(`Something went wrong. Please fix - ${res.errors}`);
	  }
	} catch (error) {
	  // обробляємо помилку під час відправки запиту
	  console.log('** error from registerNewUser **', error);
	  alert('Something went wrong. Please try again later');
	}
    };

  return (
    <div className={styles.regGroup}>
      <div>
	<h2>Registration</h2>
	<form onSubmit={registerNewUser}>
	  <div>
	    <label className={styles.regLabel} htmlFor='name'>Name</label>
	    <Input
		className={styles.regInput}
		type='text'	id='name'
		name='name'	placeholder='Enter name'
		onChange={getField}
	    ></Input>
	  </div>
					<div>
						<label className={styles.regLabel} htmlFor='email'>
							Email
						</label>
						<Input
							className={styles.regInput}
							type='text'	id='email'
							name='email' placeholder='Enter email'
							onChange={getField}
						></Input>
					</div>
					<div>
						<label className={styles.regLabel} htmlFor='password'>
							Password
						</label>
						<Input
							className={styles.regInput}
							type='password'	id='password'
							name='password' placeholder='Enter password'
							onChange={getField}
						></Input>
					</div>
					<div className={styles.regBtn}>
						<Button type='submit'>Submit registration</Button>
					</div>
					<div>
						<p className={styles.regText}>
							If you have an account you can{' '}
							<Link to='/login' className={styles.regLink}>
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Registration;

/*
У цьому компоненті створено форму реєстрації користувача, яка включає в себе поля для введення імені, електронної пошти та пароля. 
Користувач може ввести свої дані, і після натискання кнопки "Submit registration" вони будуть відправлені на сервер для реєстрації нового користувача. 
У разі успішної реєстрації користувача перенаправлять на сторінку входу, інакше виведеться повідомлення про помилку.
*/
