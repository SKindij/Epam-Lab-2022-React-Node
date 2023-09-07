// Header.tsx
import { FC } from 'react';
import './Header.css';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

import { LOGOUT_BUTTON_TEXT } from '../../constants';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// визначаємо компонент, який приймає пропси типу FC (функційний компонент)
const Header:FC = () => {
  // дозволяє отримати доступ до даних та функцій, доступних через цей контекст
  const auth = useContext(AuthContext);
  // функція для виходу користувача з системи
  const logout = () => {
		auth.logout();
	};

  // умовний оператор визначає, чи користувач аутентифікований
  return (
    <header className='header'>
      <Logo />
	  {auth.isAuthenticated ? (
        <div className='header__container'>
          <p className='header__text'>{auth.username}</p>
          <Button buttonText={LOGOUT_BUTTON_TEXT} onClick={logout} />
        </div>
	  ) : null}
    </header>
  );
};
// компонент відображає заголовок сайту з Logo та інфо користувача і кнопкою виходу, якщо користувач аутентифікований
// це залежить від даних, які надаються через контекст AuthContext
export default Header;
