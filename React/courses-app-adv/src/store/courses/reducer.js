// reducer.js
// actionTypes для роботи зі сторами Redux
import {
	ADD_ALL_COURSES, GET_ALL_COURSES,
	UPDATE_ALL_COURSES,	GET_COURSES_LIST,
	ADD_TO_COURSES_LIST, UPDATE_COURSES_LIST,
	SHOW_COURSES_LIST, REMOVE_COURSE,
	UPDATE_ONE_COURSE,
} from './actionTypes';
// початковий стан редуктора, який містить всі курси
const coursesInitialState = {
	allCourses: [],
};

// редуктор, який обробляє дії, пов'язані зі списком всіх курсів
export const allCoursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case GET_ALL_COURSES:
			return {
				...state,
				allCourses: [...action.payload],
			};
		case ADD_ALL_COURSES:
			return {
				...state,
				allCourses: [...state.allCourses, action.payload],
			};
		case UPDATE_ALL_COURSES:
			return {
				...state,
				allCourses: [...action.payload],
			};
		case UPDATE_ONE_COURSE:
			return {
				...state,
				allCourses: state.allCourses.map((course) => {
          // знаходимо курс за ідентифікатором і оновлюємо його дані
					const foundCourseIndex = course.id === action.payload.result.id;
					course[foundCourseIndex] = action.payload;
					return course;
				}),
			};
		case REMOVE_COURSE:
			return {
				...state,
				allCourses: state.allCourses.filter(
					(course) => course.id !== action.payload
				),
			};
		default:
			return state;
	}
};

// Початковий стан редуктора, який містить список всіх курсів для іншої функціональності
const fullListInitialState = {
	coursesFullList: [],
};

// Редуктор, який обробляє дії, пов'язані зі списком всіх курсів для іншої функціональності
export const coursesFullListReducer = (
	state = fullListInitialState,
	action
) => {
	switch (action.type) {
		case GET_COURSES_LIST:
			return {
				...state,
				coursesFullList: [...action.payload],
			};
		case ADD_TO_COURSES_LIST:
			return {
				...state,
				coursesFullList: [...state.coursesFullList, action.payload],
			};
		case UPDATE_COURSES_LIST:
			return {
				...state,
				coursesFullList: [...action.payload],
			};
		case UPDATE_ONE_COURSE:
			return {
				...state,
				coursesFullList: state.coursesFullList.map((course) => {
          // знаходимо курс за ідентифікатором і оновлюємо його дані
					const foundCourseIndex = course.id === action.payload.result.id;
					course[foundCourseIndex] = action.payload;
					return course;
				}),
			};
		case SHOW_COURSES_LIST:
			return { state };
		case REMOVE_COURSE:
			return {
				...state,
				coursesFullList: state.coursesFullList.filter(
					(course) => course.id !== action.payload
				),
			};
		default:
			return state;
	}
};
