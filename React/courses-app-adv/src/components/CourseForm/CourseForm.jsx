// CourseForm.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import AddAuthors from './components/AddAuthors/AddAuthors';
import styles from './CourseForm.module.css';
// функції Redux для додавання та оновлення курсів
import { useDispatch, useSelector } from 'react-redux';
import { addOneCourse, updateCourse } from '../../store/courses/thunk';
import { getAllTheCourses } from '../../store/selectors';
import { updatePoolAuthors } from './../../store/authors/actionCreators';
import { getAllPoolAuthors } from '../../store/selectors';
// хуки для роботи з параметрами та локацією
import { useParams, useLocation } from 'react-router-dom';

const CourseForm = ({
	createNewAuthor,	authInput,	setAuthInput,	submitType,	...props
}) => {
  // отримуємо ID курсу з URL-параметрів
	const { courseId } = useParams();
  // отримуємо поточну локацію
	const allLocaion = useLocation();
  // отримуємо всі курси зі стану Redux
	const courses = useSelector(getAllTheCourses);
  // знаходимо обраний курс за ID
	const myCourse = courses.filter((course) => course.id === courseId)[0];
  // встановлюємо початкове значення тривалості курсу
	const [durationValue, setDurationValue] = useState(
		myCourse ? myCourse.duration : 0
	);
	const [durationInput, setDurationInput] = useState(0);
  // стан для зберігання назви курсу
	const [newCourseTitle, setNewCourseTitle] = useState(
		allLocaion.pathname.includes('update') ? myCourse.title : ''
	);
  // стан для зберігання опису курсу
	const [newCourseDesc, setNewCourseDesc] = useState(
		allLocaion.pathname.includes('update') ? myCourse.description : ''
	);
// використовуємо useDispatch для виклику дій Redux
	const dispatch = useDispatch();
// отримуємо всіх доступних авторів зі стану Redux
	const poolAuthors = useSelector(getAllPoolAuthors);
// функція визначає авторів поточного курсу
	const getMyCourseAuth = (course) => {
		let initialAuthList = [];
		if (allLocaion.pathname.includes('update')) {
			course.authors?.forEach((authId) => {
				initialAuthList.push(poolAuthors.find((el) => el.id === authId));
			});
			return initialAuthList;
		} else return [];
	};
// функція визначає авторів, яких слід видалити з курсу
	const removeMyCourseAuth = (courses, args) => {
		if (allLocaion.pathname.includes('update')) {
			let filtered = courses.filter(function ({ id }, index, array) {
				return !args.includes(id);
			});
			return filtered;
		} else return [];
	};
// стан для зберігання авторів курсу
	const [courseAuthors, setCourseAuthors] = useState(() =>
		getMyCourseAuth(myCourse)
	);
// функція визначає, який тип кнопки відображається (створити або оновити курс)
	const btnType = () => {
		if (allLocaion.pathname.includes('add')) {
			return switchToCourses();
		} else if (allLocaion.pathname.includes('update')) {
			return submitCourseToUpdate(props.match.params.courseId);
		}
	};

	const switchToCourses = () => {
		let authorArray = courseAuthors.map((author) => author.id);
		if (newCourseTitle && newCourseDesc && durationValue && courseAuthors) {
			const newCourse = {
				title: newCourseTitle,
				description: newCourseDesc,
				creationDate: new Date(Date.now()).toLocaleDateString('en-GB'),
				duration: Number(durationInput),
				authors: authorArray,
			};
      // відправляємо запит на створення курсу до Redux
			dispatch(addOneCourse(newCourse));
      // перенаправляємо користувача на сторінку зі списком курсів
			props.history.replace('/courses');
		} else {
			window.alert('Fill in all fields');
			return;
		}
	};

	useEffect(() => {
		if (allLocaion.pathname.includes('update')) {
			const remainingAuth = removeMyCourseAuth(poolAuthors, myCourse.authors);
      // оновлюємо доступних авторів у Redux
			dispatch(updatePoolAuthors(remainingAuth));
		}
	}, []);

	const submitCourseToUpdate = async (courseId) => {
		let authorArray = courseAuthors.map((author) => author.id);
		const updatedCourseData = {
			id: courseId,
			title: newCourseTitle ? newCourseTitle : myCourse.title,
			description: newCourseDesc ? newCourseDesc : myCourse.description,
			creationDate: myCourse.creationDate,
			duration: durationInput ? Number(durationInput) : myCourse.duration,
			authors: authorArray,
		};
		await dispatch(updateCourse(updatedCourseData, courseId));
		props.history.replace('/courses');
	};
  // функції оновлюють назву та опис курсу в стані
	const getCourseTitle = (e) => {
		setNewCourseTitle(e.target.value);
	};
	const getCourseDesc = (e) => {
		setNewCourseDesc(e.target.value);
	};

	return (
		<div className={styles.CourseFormGroup}>
			<div className={styles.switchToCoursesBar}>
				<Input
					onChange={getCourseTitle}
					placeholder='Enter title...'
					value={newCourseTitle}
				>
					Title
				</Input>
				<Button onClick={() => btnType()}>{submitType}</Button>
			</div>
			<div className={styles.descInputGroup}>
				<label className={styles.descLabel} htmlFor='descTextarea'>
					Description
				</label>
				<br></br>
				<textarea
					onChange={getCourseDesc}
					className={styles.descInput}
					id='descTextarea'
					placeholder='Enter description...'
					value={newCourseDesc}
				></textarea>
			</div>
			<div>
				<AddAuthors
					courseAuthors={courseAuthors}
					setCourseAuthors={setCourseAuthors}
					durationValue={durationValue}
					setDurationValue={setDurationValue}
					setDurationInput={setDurationInput}
					createNewAuthor={createNewAuthor}
					authInput={authInput}
					setAuthInput={setAuthInput}
					myCourse={myCourse}
					poolAuthors={poolAuthors}
				></AddAuthors>
			</div>
		</div>
	);
};

export default CourseForm;
