// thunk.js
// файл містить ф-ції, які виконують асинхронні дії і викликають диспетчери для оновлення стору
import { removeSelectedCourse, updateOneCourse } from './actionCreators';
import { addAllCourses, addToCoursesList } from './actionCreators';

// ф-ція видаляє курс за його ідентифікатором з сервера та оновлює стор
export const deleteOneCourse = (id) => {
	const token = localStorage.getItem('userTocken');
	if (!token) throw new Error('User is not logged in');
	return async (dispatch) => {
		const result = await fetch(`http://localhost:4000/courses/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		const json = await result.json();
		if (json.successful) {
      // видаляємо курс зі стору Redux за його ідентифікатором
			dispatch(removeSelectedCourse(id));
		} else {
			console.log('Unable to fetch in deleteOneCourse!');
		}
	};
};

// ф-ція додає новий курс на сервері та оновлює стор Redux з курсами
export const addOneCourse = (courseData) => {
	const token = localStorage.getItem('userTocken');
	if (!token) throw new Error('User is not logged in');
	return async (dispatch) => {
		const result = await fetch(`http://localhost:4000/courses/add`, {
			method: 'POST',
			body: JSON.stringify(courseData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		const json = await result.json();
		if (json.successful) {
      // додаємо новий курс до стору та до списку курсів для іншої функціональності
			dispatch(addAllCourses(json.result));
			dispatch(addToCoursesList(json.result));
		} else {
			console.log('Unable to fetch in addOneCourse!');
		}
	};
};

// оновлює існуючий курс на сервері та оновлює стор з оновленими даними курсу
export const updateCourse = (updatedData, id) => {
	const token = localStorage.getItem('userTocken');
	if (!token) throw new Error('User is not logged in');
	return async (dispatch) => {
		const result = await fetch(`http://localhost:4000/courses/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		const json = await result.json();
		if (json) {
      // оновлюємо дані курсу в сторі Redux
			dispatch(updateOneCourse(json));
		} else {
			console.log('Unable to fetch in updateCourse!');
		}
	};
};
