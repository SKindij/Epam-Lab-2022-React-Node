// Input.jsx
import React from 'react';
import styles from './Input.module.css';

// функціональний компонент, який приймає параметри children і ...props
const Input = ({ children, ...props }) => {
  // повертаємо обгортку для елементів вводу
	return (
		<div className={styles.inputGroup}>
      {/* мітка для поля вводу */}
			<label className={styles.myLabel} htmlFor={props.name}>
				{children}
			</label>
      {/* саме поле вводу з переданими параметрами */}
			<input className={styles.myInput} {...props} />
		</div>
	);
};

export default Input;
