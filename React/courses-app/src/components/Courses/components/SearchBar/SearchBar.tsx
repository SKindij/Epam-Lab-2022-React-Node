// SearchBar.tsx
import { FC, useState, ChangeEvent } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { SEARCH_BUTTON_TEXT } from '../../../../constants';
import './SearchBar.css';

// інтерфейс описує типи пропсів компонента
interface SearchBarProps {
// очікує пропс, який є функцією, що приймає рядок і не повертає значення
  onUpdateSearch: (term:string) => void;
}

const SearchBar:FC<SearchBarProps> = ({ onUpdateSearch }) => {
  // для створення стану term з типом string
  const [term, setTerm] = useState<string>('');
  // Обробник події onChange для поля вводу,
  // який викликається при зміні вмісту поля вводу
  const onUpdateInput = (event:ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    if (newTerm.length === 0) onUpdateSearch(newTerm);
  };
  // Обробник події для кнопки "Пошук":
  const onUpdateSearchLocal = () => {
    // викликає функцію, передаючи поточний стан term
    onUpdateSearch(term);
  };

  return (
    <div className='search-container'>
      <Input
        placeholderText={'Enter course name...'}
        onChange={(event:ChangeEvent<HTMLInputElement>) => onUpdateInput(event)}
        value={term}
      />
      <Button buttonText={SEARCH_BUTTON_TEXT} onClick={onUpdateSearchLocal} />
    </div>
  );
};

// компонент SearchBar дозволяє користувачеві вводити пошуковий термін, 
// обробляє зміни вводу, і передає цей термін до функції onUpdateSearch, 
// коли користувач натискає кнопку "Пошук".
export default SearchBar;
