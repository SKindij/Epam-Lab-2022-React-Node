// Courses.jsx
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
// хуки для роботи з Redux store та дій
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
// для оновлення списку курсів у Redux store
import { updateAllCourses } from '../../store/courses/actionCreators';
import { store } from '../../store';
import { getAllTheCourses } from '../../store/selectors';
// допоміжні функції
import { fetchPoolAuthors, fetchAllCourses } from '../../services';

// компонент, який відображає сторінку зі списком курсів та функціоналом пошуку
const Courses = ({ ...props }) => {
  // стан для зберігання терміну пошуку
  const [searchTerm, setSearchTerm] = useState('');
  // порожній масив для зберігання результатів пошуку
  let newList = [];
  // отримуємо доступ до диспетчера Redux за допомогою хука  
  const dispatch = useDispatch();

  // TODO: check that below wont generate too many updates
  useEffect(() => {
	dispatch(fetchAllCourses());
	dispatch(fetchPoolAuthors());
  }, [dispatch]);
  // отримуємо всі курси зі стору Redux за допомогою хука
  const allCourses = useSelector(getAllTheCourses);
  // console.log('allCourses', allCourses);

  // функція для пошуку курсів за заданим терміном
  const searchPosts = (searchTerm) => {
      if (!searchTerm) {
      // якщо термін пошуку порожній, оновлюємо список курсів на повний список
	dispatch(
	  updateAllCourses(
	    store.getState().coursesFullListReducer.coursesFullList
	  )
        );
      // фільтруємо курси за заданим терміном
      } else {
	allCourses.filter((course) => {
	  if (course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
	    newList.push(course);
	  } else if (course.id.toLowerCase().includes(searchTerm.toLowerCase())) {
	    newList.push(course);
	  } else {
	  // відображаємо повідомлення про відсутність результатів
	    dispatch(updateAllCourses(''));
	    return <div>No Courses Found</div>;
	  }
	});
	  // оновлюємо список курсів з результатами пошуку
	  dispatch(updateAllCourses(newList));
	  }
	};

	return (
		<div className={styles.coursesGroup}>
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchPosts={searchPosts}
				history={props.history}
			/>
			{allCourses.length > 0 ? (
				allCourses.map((course, index) => {
					return <CourseCard key={course.id} index={index} {...course} />;
				})
			) : (
				<div>No courses found</div>
			)}
		</div>
	);
};

export default Courses;
