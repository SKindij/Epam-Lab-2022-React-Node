// AddAuthors.jsx
import React, { useEffect } from 'react';
import styles from './AddAuthors.module.css';
// допоміжні функції
import { timeFormatter } from '../../../../helpers/timeFormatter';
import { getHours } from '../../../../helpers/pipeDuration';
// спільні елементи
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { useDispatch } from 'react-redux';
import {
	addOnePoolAuthor,
	updatePoolAuthors,
} from '../../../../store/authors/actionCreators';

// компонент відображає форму для додавання та видалення авторів курсу
const AddAuthors = ({
	courseAuthors, setCourseAuthors,
	durationValue,	setDurationValue,	setDurationInput,
	createNewAuthor,	authInput,	setAuthInput,
	myCourse,	poolAuthors,
}) => {
  // використовуємо для виклику дій Redux
	const dispatch = useDispatch();
  // оновлюємо значення тривалості при завантаженні компонента
	useEffect(() => {
		setDurationValue(getHours(durationValue));
	}, []);

	const addCourseAuthor = (e) => {
		let auth = poolAuthors.find((el) => el.id === e.target.value);
		setCourseAuthors([...courseAuthors, auth]);
		let remainingAuthors = poolAuthors.filter((el) => el.id !== e.target.value);
		dispatch(updatePoolAuthors(remainingAuthors));
	};

	const removeCourseAuthor = (e) => {
		let auth = courseAuthors.find((el) => el.id === e.target.value);
		dispatch(addOnePoolAuthor(auth));
		let remainingAuthors = courseAuthors.filter(
			(el) => el.id !== e.target.value
		);
		setCourseAuthors(remainingAuthors);
	};

	const getAuthInput = (e) => {
		setAuthInput(e.target.value);
	};

	const setDuration = (e) => {
		const finalResult = getHours(timeFormatter(e.target.value));
		const duration = timeFormatter(e.target.value);
		setDurationValue(finalResult);
		setDurationInput(duration);
	};

	const listAuthors = (list, btn, fn) => {
		return list.map((item) => {
			return (
				<li key={item.id} className={styles.authorsListLi}>
					<span>{item.name}</span>
					<Button onClick={fn} value={item.id}>
						{btn}
					</Button>
				</li>
			);
		});
	};

	return (
		<div className={styles.addAuthorsGroup}>
			<div>
				<div className={styles.addAuthorBox}>
					<h3>Add Author</h3>
					<Input
						className={styles.addAuthorInput}
						onChange={getAuthInput}
						value={authInput}
					>
						Author name
					</Input>
					<Button
						onClick={(e) => {
							createNewAuthor(e);
						}}
					>
						Create author
					</Button>
				</div>
				<div className={styles.addAuthorBox}>
					<h3>Duration</h3>
					<Input
						className={styles.addAuthorInput}
						type='text'
						onChange={setDuration}
					>
						Duration
					</Input>
					<p>Duration:{durationValue}</p>
				</div>
			</div>
			<div>
				<div className={styles.addAuthorBox}>
					<h3>Authors</h3>
					<ul className={styles.addAuthorBoxUl}>
						{listAuthors(poolAuthors, 'Add Author', addCourseAuthor)}
					</ul>
				</div>
				<div className={styles.addAuthorBox}>
					<h3>Course authors</h3>
					<ul className={styles.addAuthorBoxUl}>
						{listAuthors(courseAuthors, 'Delete Author', removeCourseAuthor)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AddAuthors;
