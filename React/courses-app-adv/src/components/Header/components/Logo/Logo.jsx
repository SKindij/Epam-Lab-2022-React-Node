// Logo.jsx
import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
	return (
		<div>
			<img
				src={process.env.PUBLIC_URL + '/myLogo.png'}
				alt='courses logo'
				className={styles.logo}
			></img>
		</div>
	);
};

export default Logo;
