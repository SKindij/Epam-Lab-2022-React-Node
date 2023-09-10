// Header.jsx
import React from 'react';
import Logo from './components/Logo/Logo';
import styles from './Header.module.css';
// хук для отримання поточного URL
import { useLocation } from 'react-router-dom';
// компонент для виходу залогованого користувача
import Logout from './components/Logout/Logout';
// хук та селектор з Redux для отримання даних користувача
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';

// компонент, який приймає зовнішню функцію
const Header = ({ userLogout }) => {
  // для отримання поточного шляху з URL
	const { pathname } = useLocation();
  // для отримання даних користувача зі стору Redux
	const user = useSelector(getUser);

  // відображаємо заголовок додатку, та при необхідності <Logout/>
	return (
		<div className={styles.myHeader}>
			<Logo />
			{pathname !== '/registration' &&
				pathname !== '/login' &&
				pathname !== '/' && <Logout user={user} userLogout={userLogout} />}
		</div>
	);
};

export default Header;
