// selectors.js

// повертає об'єкт користувача із стору Redux
export const getUser = (state) => state.userReducer;

// повертає масив авторів із стору Redux, які є в "басейні"
export const getAllPoolAuthors = (state) =>
	state.poolAuthorsReducer.poolAuthors;

// повертає масив початкових авторів із стору Redux
export const getAllInitialAuthors = (state) =>
	state.initialAuthorsReducer.initialAuthors;

// повертає масив усіх курсів із стору Redux
export const getAllTheCourses = (state) => state.allCoursesReducer.allCourses;

// повертає масив списку курсів із стору Redux
export const getCoursesList = (state) =>
	state.coursesFullListReducer.coursesFullList;

/*
Ці селектори допомагають легко отримувати дані зі стору Redux в різних частинах програми. 
Вони приймають стан (state) і повертають відповідну частину даних із стору.
*/
