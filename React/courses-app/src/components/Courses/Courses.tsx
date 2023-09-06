// Courses.tsx
import { useState, FC } from 'react';

import {
  mockedCoursesList,
  mockedAuthorsList,
  ADD_BUTTON_TEXT,
} from '../../constants';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import './Courses.css';

interface Course {
  id:string;
  title:string;
  duration:number;
  creationDate:string;
  description:string;
  authors: string | string[];
}
// Оголошення компонента за допомогою типу FC (Functional Component)
const Courses:FC = () => {
  // стани: term (пошуковий термін) та addCourse (для додавання курсу)
  const [term, setTerm] = useState<string>('');
  const [addCourse, setAddCourse] = useState<boolean>(false);
  
  // Функція для пошуку курсів
  const searchCourse = (items:Course[], term:string) => {
    if (term.length === 0) return items;
	// фільтрує масив курсів на основі терміна
    return items.filter((item) => {
      return (
        item.title.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        item.id.toLowerCase().indexOf(term.toLowerCase()) > -1
      );
    });
  };
  // Обробник події для оновлення терміну пошуку:
  const onUpdateSearch = (term:string) => {
    // викликається при оновленні пошуку і оновлює стан term
    setTerm(term);
  };
  
  // отримання масиву курсів, які відповідають поточному пошуковому терміну
  const visibleCourses = searchCourse(mockedCoursesList, term);
  
  // Отримання авторів курсу за масивом ідентифікаторів
  const getCourseAuthors = (authorsIds:string[]) => {
    return authorsIds
      .map((authorId) => {
        const author = mockedAuthorsList.find((author) => author.id === authorId);
        return author ? author.name : null;
      })
      .filter((authorName) => authorName !== null) as string[];
  };

  // Обробник події для додавання курсу:
  const onCourseAdd = () => {
    // викликається натисканням "Додати курс" і оновлює стан addCourse на true, 
	// щоб показати компонент для створення курсу
    setAddCourse(true);
  };

  return (
    <div className='container'>
      {!addCourse ? (
        <>
          <div className='container__toolbar'>
            <SearchBar onUpdateSearch={onUpdateSearch} />
            <Button buttonText={ADD_BUTTON_TEXT} onClick={onCourseAdd} />
          </div>
          <ul className='container__list'>
            {visibleCourses.map((course) => {
              const authors = getCourseAuthors(course.authors).join(', ');
              return (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  duration={course.duration}
                  creationDate={course.creationDate}
                  description={course.description}
                  authors={authors}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <CreateCourse setAddCourse={setAddCourse} />
      )}
    </div>
  );
};
// компонент відповідає за відображення списку курсів, фільтрацію їх за пошуковим терміном, 
// додавання нового курсу та взаємодію з іншими компонентами у додатку 
export default Courses;
