import { FC, useState } from 'react';

import { mockedCoursesList, mockedAuthorsList, ADD_BUTTON_TEXT } from '../../constants';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import './Courses.css';

const Courses:FC = () => {
  const [term, setTerm] = useState<string>('');
  const [addCourse, setAddCourse] = useState<boolean>(false);

  const searchCourse = (items:any[], searchTerm:string) => {
    if (searchTerm.length === 0) return items;
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const onUpdateSearch = (searchTerm:string) => {
    setTerm(searchTerm);
  };

  const visibleCourses = searchCourse(mockedCoursesList, term);

  const getCourseAuthors = (authorsIds:string[]) => {
    return authorsIds
      .map((authorId) => {
        const author = mockedAuthorsList.find((author) => author.id === authorId);
        return author ? author.name : null;
      })
      .filter(Boolean)
      .join(', ');
  };

  const onCourseAdd = () => {
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
              const authors = getCourseAuthors(course.authors);
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

export default Courses;
