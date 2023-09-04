import { FC } from 'react';
import './Logo.css';

// щоб вказати, що Logo - це функціональний компонент
const Logo:FC = () => {
  return (
    <img
      className='logo__img'
      src='/images/courses-logo.png'
      alt='courses logo'
    />
  );
};

export default Logo;
