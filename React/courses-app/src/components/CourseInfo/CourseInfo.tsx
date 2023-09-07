// CourseInfo.tsx
import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { dateGenerator } from '../../helpers/dateGenerator';
import { pipeDuration } from '../../helpers/pipeDuration';
import './CourseInfo.css';

// Імпорт інтерфейсу з CourseCardProps
import { CourseCardProps } from './CourseCard';
// Використання інтерфейсу для пропсів CourseInfo
interface CourseInfoProps extends CourseCardProps {}

const CourseInfo:FC<CourseInfoProps> = () => {
  // використовуємо useParams з React Router для отримання courseId з URL
  // це дозволяє визначити, який курс відображати на сторінці
  const { courseId } = useParams<{courseId:string}>();
  // функція отримання авторів курсу:
  const getCourseAuthors = (authorsIds:string[]) => {
    // проходимося по масиву authorsIds та для кожного ід шукаємо відповідного автора
    return authorsIds.map((authorId, index) => {
      const author = mockedAuthorsList.find((author) => author.id === authorId);
      if (!author) return null;
      if (index === authorsIds.length - 1) return author.name;
      return author.name;
    });
  };
  // використовуємо find для пошуку курсу за його ід, отриманим з URL
  const course = mockedCoursesList.find((element) => element.id === courseId);
  // використовуємо раніше створену функцію для отримання рядка імен авторів курсу
  const authors = getCourseAuthors(course.authors).join(', ');

  return (
    <div className='course-info'>
      <div className='course-info__link'>
        <Link to='/courses' style={{ textDecoration: 'none', color: 'black' }}>
          ◀ Back to courses
        </Link>
      </div>
      <div className='course-info__wrapper'>
        <p className='course-info__title'>{course.title}</p>
        <div className='course-info__container'>
          <div className='course-info__desc'>{course.description}</div>
          <div className='course-info__about'>
            <div className='course-info__field'>
              <span className='course-info__field--bold'>ID: </span>
              {courseId}
            </div>
            <div className='course-info__field'>
              <span className='course-info__field--bold'>Duration: </span>
              {pipeDuration(course.duration)} hours
            </div>
            <div className='course-info__field'>
              <span className='course-info__field--bold'>Created: </span>
              {dateGenerator(course.creationDate)}
            </div>
            <div className='course-info__field'>
              <div className='course-info__field--bold'>Authors: </div>
              {authors}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
