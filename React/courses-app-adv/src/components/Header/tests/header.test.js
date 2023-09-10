// header.test.js
// потрібний для тестування компонент
import Header from '../Header';
// необхідні бібліотеки для тестування React-компонентів
import { render, screen } from '@testing-library/react';
// Provider для забезпечення доступу до Redux store
import { Provider } from 'react-redux';
// роутер для навігаційних тестів
import { BrowserRouter } from 'react-router-dom';
// дані для симуляції поточного шляху
import routeData from 'react-router';
// підключаємо бібліотеку для покращення можливостей тестування
import '@testing-library/jest-dom';

// створюємо фіксований стан, який містить дані користувача та поточний pathname
const mockedState = {
	user: {
		isAuth: true,
		name: 'Test',
		role: '',
		email: 'test@test.com',
		token: '',
	},
	pathname: '/courses',
};
// створюємо фіксований Redux store, який містить різні методи
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	getUser: () => {
		return mockedState.user;
	},
};

// мокуємо компонент Logout, щоб замінити його під час тестування
jest.mock('../components/Logout/Logout.jsx', () => () => {
	return (
		<div id='Logout'>
			<div>
				<p data-testid='user-name'>Test Name</p>
			</div>
		</div>
	);
});

// створюємо компонент для тестування Header з контекстом та роутингом
const MockedApp = () => {
  // спостерігаємо за викликами useLocation та повертаємо мокований шлях '/addd'
	const useLocation = jest.spyOn(routeData, 'useLocation');
	useLocation.mockReturnValue({ search: '/addd' });

	return (
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Header></Header>
			</Provider>
		</BrowserRouter>
	);
};

// описуємо тести для Header компонента
describe('Header tests', () => {
  // виконуємо цей блок коду перед кожним тестом
	beforeEach(() => {
		render(<MockedApp />);
	});
  // тест перевіряє, чи присутній логотип у Header компоненті
	test('Header should have logo', () => {
		// screen.debug();
		const imgElement = screen.getByRole(/img/);
		expect(imgElement).toBeInTheDocument();
	});
  // тест перевіряє, чи відображається ім'я користувача у Header компоненті
	test('Header should display user name', () => {
		const linkElement = screen.getByTestId(/user-name/);
		expect(linkElement).toHaveTextContent('Test Name');
	});
});

