// actionCreators.js
import {
	ADD_ALL_COURSES,	UPDATE_ALL_COURSES,
	ADD_TO_COURSES_LIST,	REMOVE_COURSE,
	UPDATE_ONE_COURSE,
} from './actionTypes';

export const addAllCourses = (payload) => ({
	type: ADD_ALL_COURSES,
	payload,
});

export const updateAllCourses = (payload) => ({
	type: UPDATE_ALL_COURSES,
	payload,
});

export const updateOneCourse = (payload) => ({
	type: UPDATE_ONE_COURSE,
	payload,
});

export const addToCoursesList = (payload) => ({
	type: ADD_TO_COURSES_LIST,
	payload,
});

export const removeSelectedCourse = (payload) => ({
	type: REMOVE_COURSE,
	payload,
});
