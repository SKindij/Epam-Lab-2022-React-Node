// CourseInfo.jsx
import React from 'react';
// хук та компонент для роботи з параметрами URL та навігацією
import { useParams, Link } from 'react-router-dom';
import styles from './CourseInfo.module.css';
// функція для відбору авторів курсу
import collectAuthors from '../../helpers/getAuthorsNames';
// хуки ля роботи з Redux store та селектори для отримання даних
import { useSelector, useDispatch } from 'react-redux';
import { getAllInitialAuthors, getAllTheCourses } from '../../store/selectors';

const CourseInfo = () => {
  // отримуємо всі курси зі стору Redux
	const allCourses = useSelector(getAllTheCourses);
  // для отримання параметра courseId з URL
	const { courseId } = useParams();
  // отримуємо поточний курс за courseId з URL
	let currentCourse = allCourses[`${courseId}`];
  // отримуємо авторів поточного курсу з даних курсу
	let currentCourseAuthors = currentCourse.authors;
  // створюємо порожній масив для зберігання імен авторів
	let authorsCourseList = [];
  // отримуємо початковий список авторів зі стору Redux 
	const initialAuthors = useSelector(getAllInitialAuthors);

  // повертаємо JSX-елемент, який відображає інформацію про курс
	return (
		<div className={styles.courseInfoGroup}>
			<div className={styles.courseBtn}>
				<Link className={styles.courseLink} to='/courses'>
					<b>&larr; Back to courses</b>
				</Link>
			</div>
			<div>
				<h1>{currentCourse.title}</h1>
			</div>
			<div className={styles.courseInfoColumns}>
				<div className={styles.courseDesc}>{currentCourse.description}</div>
				<div className={styles.courseRestInfo}>
					<div className={styles.courseRestInfoLine}>
						<b className={styles.courseInfoKeys}>ID:</b>
						{currentCourse.id}
					</div>
					<div>
						<b className={styles.courseInfoKeys}>Duration:</b>
						{currentCourse.duration}
					</div>
					<div>
						<b className={styles.courseInfoKeys}>Created:</b>
						{currentCourse.creationDate}
					</div>
					<div>
						<b className={styles.courseInfoKeys}>Authors:</b>
						{collectAuthors(
							authorsCourseList,
							currentCourseAuthors,
							initialAuthors
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
