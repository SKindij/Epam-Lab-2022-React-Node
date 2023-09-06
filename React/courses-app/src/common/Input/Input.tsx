// Input.tsx
import { ChangeEvent, FC } from 'react';
import './Input.css';

// даний інтерфейс описує типи пропсів
interface InputProps {
  labelText:string;
  placeholderText:string;
  // обробник, що очікує подію ChangeEvent та має доступ до HTMLInputElement
  onChange: (event:ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  value:string;
  id?: string; // опціональний пропс для id
}

const Input:FC<InputProps> = ({
    labelText, placeholderText, onChange,
    type = 'text', value, id
  }) => {
  return (
    <form className='form'>
      <label htmlFor={id}>{labelText}</label>
      <input
        className='input' type={type} name='input'
		id={id} // вказує на htmlFor
        onChange={onChange} value={value}
        placeholder={placeholderText}       
      />
    </form>
  );
};

export default Input;
