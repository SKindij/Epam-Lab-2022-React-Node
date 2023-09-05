import { ChangeEventHandler } from 'react';
import './Input.css';

// даний інтерфейс описує типи пропсів
interface InputProps {
  labelText:string;
  placeholderText:string;
  onChange:ChangeEventHandler<HTMLInputElement>;
  type?:string;
  value:string;
}

const Input:React.FC<InputProps> = ({
    labelText, placeholderText, onChange,
    type = 'text', value,
  }) => {
  return (
    <form className='form'>
      <label htmlFor='input'>{labelText}</label>
      <input
        className='input' type={type} name='input'
        onChange={onChange} value={value}
        placeholder={placeholderText}       
      />
    </form>
  );
};

export default Input;
