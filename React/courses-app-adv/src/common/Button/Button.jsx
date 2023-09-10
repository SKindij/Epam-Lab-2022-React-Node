// Button.jsx
import React from 'react';
import styles from './Button.module.css';

// функціональний компонент, який приймає параметри children і ...props
const Button = ({ children, ...props }) => {
	// children - це вміст, який буде відображений всередині кнопки
  return (
		<button {...props} className={styles.myBtn}>
			{children}
		</button>
	);
};

export default Button;
