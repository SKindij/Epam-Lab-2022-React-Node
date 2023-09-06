// CourseCard.tsx
import { FC } from 'react';

import Button from '../../../../common/Button/Button';
import { dateGenerator } from '../../../../helpers/dateGenerator';
import { pipeDuration } from '../../../../helpers/pipeDuration';

import { SHOW_BUTTON_TEXT } from '../../../../constants';

import './CourseCard.css';

interface CourseCardProps {
  title:string;
  duration:number;
  creationDate:string;
  description:string;
  authors: string | string[];
}

const CourseCard:FC<CourseCardProps> = ({
  title, duration, creationDate, description, authors,
}) => {
  return (
    <li className='item__container'>
      <div className='item__text'>
        <div className='item__title'>{title}</div>
        <div className='item__desc'>{description}</div>
      </div>
      <div className='item__description'>
        <div className='item__field'>
          <span className='item__field--bold'>Authors: </span>
          {authors} 
        </div>
        <div className='item__field'>
          <span className='item__field--bold'>Duration: </span>
          {pipeDuration(duration)}
        </div>
        <div className='item__field'>
          <span className='item__field--bold'>Created: </span>
          {dateGenerator(creationDate)}
        </div>
        <div className='item__btn'>
          <Button buttonText={SHOW_BUTTON_TEXT} />
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
