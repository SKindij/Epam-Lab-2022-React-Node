import './Button.css';
import { FC, MouseEventHandler, ReactNode } from 'react';

// інтерфейс, який визначає типи для buttonText, onClick та type
interface ButtonProps {
  // щоб дозволити передачу будь-якого React-елементу в якості тексту кнопки
  buttonText:ReactNode;
  // щоб вказати правильний тип події
  onClick:MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}
// використано FC (функціональний компонент)
const Button:FC<ButtonProps> = ({ buttonText, onClick, type = 'button' }) => {
  return (
    <button className='btn' onClick={onClick} type={type}>
      {buttonText}
    </button>
  );
};

export default Button;
