// Input.tsx
import { ChangeEvent, FC } from 'react';
import './Input.css';

// даний інтерфейс описує типи пропсів
interface InputProps {
  labelText:string;
  placeholderText:string;
  // обробник, що очікує подію ChangeEvent та має доступ до HTMLInputElement
  onChange: (event:ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  name:string;
  value:string;
  id?: string; // опціональний пропс для id
}

const Input:FC<InputProps> = ({
    labelText, placeholderText, onChange, onBlur,
    type = 'text', name, value, id
  }) => {
  return (
    <div className='form-input'>
      <label htmlFor={id}>{labelText}</label>
      <input
        className='input' type={type}
		id={id} // вказує на htmlFor
        onChange={onChange} onBlur={onBlur}
		value={value} name={name}
        placeholder={placeholderText}  
      />
    </div>
  );
};

export default Input;
