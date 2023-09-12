// MainPage.jsx
import React from 'react';
// компонент для навігації між сторінками
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

// компонент відображає вітання та посилання на сторінки реєстрації та входу
const MainPage = () => {
	return (
		<div className={styles.mainGroup}>
			Hi! Welcome to the Main Page! Please
			<Link className={styles.mainLink} to='/registration'>
				register
			</Link>
			or
			<Link className={styles.mainLink} to='/login'>
				login
			</Link>
			to proceed.
		</div>
	);
};

export default MainPage;
