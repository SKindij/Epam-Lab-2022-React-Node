// SearchBar.jsx
import React from 'react';
// хук для отримання даних з Redux store
import { useSelector } from 'react-redux';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import styles from './SearchBar.module.css';

// функціональний компонент, який відображає поле пошуку та можливість додати новий курс
const SearchBar = ({ searchPosts, setSearchTerm, searchTerm, history }) => {
  // отримуємо роль користувача зі стору Redux
	const roleState = useSelector((state) => state.userReducer.role);
  // функція для переходу до сторінки додавання нового курсу
	const switchToAddCourse = () => {
		history.replace('courses/add');
	};

  // відображає поле пошуку, кнопку пошуку та, для адміністратора, кнопку для додавання нового курсу
	return (
		<div className={styles.subHeaderGroup}>
			<div className={styles.searchBarGroup}>
        {/* Відображаємо компонент Input для введення терміну пошуку. */}
				<Input
					className={styles.searchInput}
					placeholder='Search by title or id'
					onChange={(e) => {
            // функція оновлює термін пошуку при зміні вмісту поля вводу
						setSearchTerm(e.target.value);
					}}
				/>
        {/* Кнопка для запуску пошуку за заданим терміном. */}
				<Button onClick={() => searchPosts(searchTerm)}>Search</Button>
			</div>{' '}
      {/* відображення кнопки для додавання нового курсу, якщо користувач - адміністратор */}
			{roleState && roleState === 'admin' ? (
				<Button onClick={() => switchToAddCourse()}>Add new course</Button>
			) : (
				''
			)}
		</div>
	);
};

export default SearchBar;
