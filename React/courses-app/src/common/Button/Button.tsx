// Button.tsx
import { FC, MouseEvent, ReactNode } from 'react';
import './Button.css';

// інтерфейс, який визначає типи для buttonText, onClick та type
interface ButtonProps {
  // щоб дозволити передачу будь-якого React-елементу в якості тексту кнопки
  buttonText:string;
  // щоб вказати правильний тип події
  onClick: (event:MouseEvent<HTMLButtonElement>) => void;
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
