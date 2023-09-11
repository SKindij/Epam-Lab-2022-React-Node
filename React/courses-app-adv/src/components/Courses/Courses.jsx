// Courses.jsx
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import { updateAllCourses } from '../../store/courses/actionCreators';
import { store } from '../../store';
import { getAllTheCourses } from '../../store/selectors';
import { fetchPoolAuthors, fetchAllCourses } from '../../services';

const Courses = ({ ...props }) => {
	const [searchTerm, setSearchTerm] = useState('');
	let newList = [];

	const dispatch = useDispatch();

	// TODO: check that below wont generate too many updates
	useEffect(() => {
		dispatch(fetchAllCourses());
		dispatch(fetchPoolAuthors());
	}, [dispatch]);

	const allCourses = useSelector(getAllTheCourses);

	// console.log('allCourses', allCourses);

	const searchPosts = (searchTerm) => {
		if (!searchTerm) {
			dispatch(
				updateAllCourses(
					store.getState().coursesFullListReducer.coursesFullList
				)
			);
		} else {
			allCourses.filter((course) => {
				if (course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
					newList.push(course);
				} else if (course.id.toLowerCase().includes(searchTerm.toLowerCase())) {
					newList.push(course);
				} else {
					dispatch(updateAllCourses(''));
					return <div>No Courses Found</div>;
				}
			});
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
