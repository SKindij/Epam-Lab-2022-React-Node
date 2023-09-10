// Logout.jsx
import React from 'react';
import Button from '../../../../common/Button/Button';
import styles from './Logout.module.css';
// хук та селектор з Redux для отримання даних користувача
import { useSelector } from 'react-redux';
import { getUser } from '../../../../store/selectors';

// функціональний компонент, який приймає функцію
const Logout = ({ userLogout }) => {
  // використовуємо хук для отримання даних користувача зі стору Redux
	const user = useSelector(getUser);

  // 
	return (
		<div>
			<div className={styles.logoutGroup}>
				<p className={styles.logoutItem}>{user.name}</p>
				<Button className={styles.logoutItem} onClick={userLogout}>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default Logout;
