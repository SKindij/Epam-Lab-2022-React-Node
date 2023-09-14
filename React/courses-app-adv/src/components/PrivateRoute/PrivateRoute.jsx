// PrivateRoute.jsx
import { Route, Redirect } from 'react-router-dom';
import { store } from '../../store/index';

// компонент приймає дітей (елементи для відображення) та інші параметри
export const PrivateRoute = ({ children, ...rest }) => {
  // отримуємо роль користувача зі стору Redux
	const userRole = store.getState().userReducer.role;
  // якщо 'admin', відображаємо компонент `Route` з переданими параметрами
  // якщо ні, перенаправляємо його на сторінку '/courses'
	return userRole === 'admin' ? (
		<Route {...rest}>{children}</Route>
	) : (
		<Redirect to='/courses' />
	);
};
// Цей компонент використовується для захисту певних маршрутів, 
// дозволяючи доступ лише користувачам з роллю 'admin'. 
