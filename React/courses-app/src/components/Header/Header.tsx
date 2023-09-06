// Header.tsx
import { FC } from 'react';
import './Header.css';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

import { LOGOUT_BUTTON_TEXT } from '../../constants';

const Header:FC = () => {
  const handleLogout = () => {
    console.log('обробник виходу з системи');
    //todo: додайте обробник виходу з системи тут
  };

  return (
    <header className='header'>
      <Logo />
      <div className='header__container'>
        <p className='header__text'>Dave</p>
        <Button buttonText={LOGOUT_BUTTON_TEXT} onClick={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
