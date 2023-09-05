import { FC, ChangeEventHandler } from 'react';
import './Textarea.css';

interface TextareaProps {
  labelText:string;
  placeholderText:string;
  onChange:ChangeEventHandler<HTMLTextAreaElement>;
  value:string;
}

const Textarea:FC<TextareaProps> = ({
  labelText, placeholderText,
  onChange, value,
}) => {
  return (
    <div className='textarea-container'>
      <label htmlFor='text'>{labelText}</label>
      <textarea
        className='textarea' onChange={onChange}
        rows={5} name='text'
        placeholder={placeholderText} value={value}
      />
    </div>
  );
};

export default Textarea;
