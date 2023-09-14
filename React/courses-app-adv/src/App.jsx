// App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import { isAuthorized } from './context/index';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useDispatch } from 'react-redux';
import { addOneAuthor } from './store/authors/thunk';
import { removeUser } from './store/user/actionCreators';
import { fetchAllCourses, userLogoutCall, fetchPoolAuthors } from './services';

import { PrivateRoute } from '../src/components/PrivateRoute/PrivateRoute';

function App() {
	const dispatch = useDispatch();
  // стан для зберігання значення введеного автора
	const [authInput, setAuthInput] = useState('');
  // стан, який визначає, чи авторизований користувач
	const [authorization, setAuthorization] = useState(false);

  // для завантаження курсів та авторів з сервера після монтажу компонента
	useEffect(() => {
		dispatch(fetchAllCourses());
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchPoolAuthors());
	}, [dispatch]);

	const router = useHistory();
  // обробник події для створення нового автора
	const createNewAuthor = (e) => {
		e.preventDefault();
		const newAuth = {
			name: authInput,
		};
		dispatch(addOneAuthor(newAuth));
		setAuthInput('');
	};
  // обробник події для виходу користувача
	const userLogout = async () => {
    // відправлення запиту на виход і очищення даних користувача
		let result = await userLogoutCall();
		if (result.status === 200) {
			localStorage.removeItem('userTocken');
			setAuthorization(false);
			dispatch(removeUser());
			router.push('/login');
		}
	};

  /*
    Контекст isAuthorized встановлюється, щоб передавати значення авторизації 
    і можливість її зміни дочірнім компонентам в дереві компонентів.
    Використовуються різні маршрути залежно від стану авторизації користувача.
    PrivateRoute - для обмеження доступу до окремих маршрутів лише авторизованим користувачам.
  */
	return (
		<div>
			<isAuthorized.Provider
				value={{ authorization,	setAuthorization,	}}
			>
				<Header userLogout={userLogout} />
				<Switch>
					<PrivateRoute
						path='/courses/add'
						render={(props) => {
							return (
								<CourseForm
									createNewAuthor={createNewAuthor}
									authInput={authInput}
									setAuthInput={setAuthInput}
									submitType='Create course'
									{...props}
								/>
							);
						}}
					/>
					<PrivateRoute
						path='/courses/update/:courseId'
						render={(props) => {
							return (
								<CourseForm
									createNewAuthor={createNewAuthor}
									authInput={authInput}
									setAuthInput={setAuthInput}
									submitType='Update course'
									{...props}
								/>
							);
						}}
					/>
					{authorization ? (
						<Route
							exact
							path='/courses'
							render={(props) => <Courses {...props} />}
						/>
					) : (
						<Route exact path='/registration'>
							<Registration />
						</Route>
					)}
					<Route exact path='/courses/:courseId'>
						<CourseInfo />
					</Route>

					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/'>
						<MainPage />
					</Route>
					<Redirect to='/registration' />
				</Switch>
			</isAuthorized.Provider>
		</div>
	);
}

export default App;
