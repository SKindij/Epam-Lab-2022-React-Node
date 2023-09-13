// index.js
// необхідні функції та бібліотеки Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// редуктори з інших файлів
import { initialAuthorsReducer } from './authors/initialAuthorsReducer';
import { poolAuthorsReducer } from './authors/poolAuthorsReducer';
import { userReducer } from './user/reducer';
import { allCoursesReducer, coursesFullListReducer } from './courses/reducer';

// об'єднуємо всі редуктори в один кореневий редуктор
const rootReducer = combineReducers({
	initialAuthorsReducer: initialAuthorsReducer,
	poolAuthorsReducer: poolAuthorsReducer,
	userReducer: userReducer,
	allCoursesReducer: allCoursesReducer,
	coursesFullListReducer: coursesFullListReducer,
});

// створюємо Redux-стор, передаючи кореневий редуктор і middleware для асинхронних дій
export const store = createStore(rootReducer, applyMiddleware(thunk));
