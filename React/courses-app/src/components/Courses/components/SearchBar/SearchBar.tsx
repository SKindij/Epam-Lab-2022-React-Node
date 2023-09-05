import { FC, useState, ChangeEvent } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import { SEARCH_BUTTON_TEXT } from '../../../../constants';

import './SearchBar.css';

// інтерфейс описує типи пропсів компонента
interface SearchBarProps {
  onUpdateSearch: (term:string) => void;
}

const SearchBar:FC<SearchBarProps> = ({ onUpdateSearch }) => {
  // для створення стану term з типом string
  const [term, setTerm] = useState<string>('');
  // Тип параметра event вказано для правильної типізації
  const onUpdateInput = (event:ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setTerm(newTerm);
    if (newTerm.length === 0) onUpdateSearch(newTerm);
  };

  const onUpdateSearchLocal = () => {
    onUpdateSearch(term);
  };

  return (
    <div className='search-container'>
      <Input
        placeholderText={'Enter course name...'}
        onChange={(event) => onUpdateInput(event)}
        value={term}
      />
      <Button buttonText={SEARCH_BUTTON_TEXT} onClick={onUpdateSearchLocal} />
    </div>
  );
};

export default SearchBar;
