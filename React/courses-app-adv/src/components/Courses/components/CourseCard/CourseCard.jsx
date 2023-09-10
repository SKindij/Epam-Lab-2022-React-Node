// CourseCard.jsx
import React from 'react';
import styles from './CourseCard.module.css';
import Button from '../../../../common/Button/Button';
// допоміжні функції 
import { getHours } from '../../../../helpers/pipeDuration';
import { formatCreated } from '../../../../helpers/formatCreated';
// компонент для навігації
import { Link } from 'react-router-dom';
import collectAuthors from '../../../../helpers/getAuthorsNames';
// хуки для роботи з Redux store та селектори для отримання даних та виклику дій
import { useSelector, useDispatch } from 'react-redux';
import { deleteOneCourse } from '../../../../store/courses/thunk';
import { getAllInitialAuthors } from '../../../../store/selectors';

// функціональний компонент, який відображає інформацію про курс
const CourseCard = ({ index, ...course }) => {
  // отримуємо роль користувача зі стору Redux
	const roleState = useSelector((state) => state.userReducer.role);
  // створюємо порожній масив для зберігання імен авторів
	let authorsCourseList = [];
  // отримуємо доступ до диспетчера Redux
	const dispatch = useDispatch();

  // отримуємо початковий список авторів зі стору Redux
	const initialAuthors = useSelector(getAllInitialAuthors);
  // функція для видалення курсу при натисканні на кнопку "Remove"
	const removeCourse = (e) => {
		const id = e.target.value ? e.target.value : course.id;
		dispatch(deleteOneCourse(id));
	};

	return (
		<div className={styles.courseCard}>
			<div className={styles.courseCardBody}>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className={styles.courseCardInfo}>
				<div>
					<p className={styles.authorsCardInfo}>
						<strong>Authors: </strong>
						{collectAuthors(authorsCourseList, course.authors, initialAuthors)}
					</p>
					<p>
						<strong>Duration: </strong>
						{getHours(course.duration)}
					</p>
					<p>
						<strong>Created: </strong>
						{formatCreated(course.creationDate)}
					</p>
				</div>
				<div className={styles.courseCardBtnsGroup}>
          {/* Посилання на сторінку курсу за допомогою компонента Link. */}
					<Link to={`/courses/${index}`}>
						<Button className={styles.courseCardBtn}>Show course</Button>
					</Link>
					{roleState && roleState === 'admin' ? (
						<>
              {/* Посилання на сторінку редагування курсу. */}
							<Link to={`/courses/update/${course.id}`}>
								<Button className={styles.courseCardBtn} value={course.id}>
									<img
										src={process.env.PUBLIC_URL + 'icons/icon-edit.png'}
										alt='edit course button'
										className={styles.courseCardImg}
										value={course.id}
									></img>
								</Button>
							</Link>
              {/* Кнопка видалення курсу. */}
							<Button
								className={styles.courseCardBtn}
								value={course.id}
								onClick={removeCourse}
							>
								<img
									src={process.env.PUBLIC_URL + 'icons/icon-remove.png'}
									alt='remove course button'
									className={styles.courseCardImg}
								></img>{' '}
							</Button>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
