// CreateCourse.tsx
import { FC, useState, ChangeEvent } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import {
  mockedAuthorsList, mockedCoursesList,
  CREATE_BUTTON_TEXT, CREATE_AUTHOR_BUTTON_TEXT,
  ADD_AUTHOR_BUTTON_TEXT, DELETE_AUTHOR_BUTTON_TEXT,
} from '../../constants';
import { pipeDuration } from '../../helpers/pipeDuration';
import { uniqueId } from '../../helpers/uniqueIdGenerator';

import './CreateCourse.css';

const CreateCourse:FC<{ setAddCourse: (addCourse:boolean) => void }> = ({
  setAddCourse,
}) => {
  // стани для зберігання даних форми створення курсу та обраних авторів
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [duration, setDuration] = useState('');
  const [chosenAuthors, setChosenAuthors] = useState<any[]>([]);

  // оголошені функції для обробки подій відповідно до введених даних користувачем
  const onTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const onAuthorChange = (e:ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };
  const onDurationChange = (e:ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };
  // функція додає нового автора до списку авторів
  const onAuthorAdded = () => {
    if (author.length < 2) {
      alert('Author name should be at least 2 characters');
      return;
    }
    const newAuthor = {
      id: uniqueId(),
      name: author,
    };
    setAuthors([...authors, newAuthor]);
    mockedAuthorsList.push(newAuthor);
    setAuthor('');
  };

  // ці функції додають або видаляють авторів із списку обраних авторів
  const onAuthorChosen = (author:any) => {
    setChosenAuthors([...chosenAuthors, author]);
    setAuthors((authors) => authors.filter((item) => item.id !== author.id));
  };
  const onAuthorDeleted = (author:any) => {
    setChosenAuthors((chosenAuthors) =>
      chosenAuthors.filter((item) => item.id !== author.id)
    );
    setAuthors([...authors, author]);
  };
  // створює новий курс і додає його до списку курсів
  const onCourseCreate = () => {
    if (title.length < 2 || description.length < 2 || !chosenAuthors || !duration) {
      alert('Please, fill in all fields ');
      return;
    }
    const date = new Date().toLocaleDateString();
    const courseAuthors = chosenAuthors.map((author) => author.id);
    const newCourse = {
      id: uniqueId(),
      title: title,
      description: description,
      creationDate: date,
      duration: duration,
      authors: courseAuthors,
    };
    mockedCoursesList.push(newCourse);
    setTitle('');
    setDescription('');
    setDuration('');
    setAddCourse(false);
  };
  // закриває форму створення курсу та очищає поля
  const onCancel = () => {
    setTitle('');
    setDescription('');
    setAuthor('');
    setDuration('');
    setChosenAuthors([]);
    setAddCourse(false);
  };
  // значення станів прив'язані до відповідних елементів форми за допомогою value={value}
  return (
    <div className='course-container'>
      <div className='course-container__toolbar'>
        <Input
          labelText='Title'
          placeholderText='Enter course title...'
          onChange={onTitleChange}
          value={title}
        />
        <Button buttonText={CREATE_BUTTON_TEXT} onClick={onCourseCreate} />
        <Button buttonText='Cancel' onClick={onCancel} />
	  </div>
      <Textarea
        labelText='Description'
        placeholderText='Enter course description'
        onChange={onDescriptionChange}
        value={description}
      />
      <div className='course-container__authors'>
        <div className='course-container__author-info'>
          <p className='course-title'>Add author</p>
          <div className='course-input'>
            <Input
              labelText='Author name'
              placeholderText='Enter author name...'
              onChange={onAuthorChange}
              value={author}
            />
          </div>
          <div className='course-btn'>
            <Button
              buttonText={CREATE_AUTHOR_BUTTON_TEXT}
              onClick={onAuthorAdded}
            />
          </div>
          <p className='course-title'>Duration</p>
          <div className='course-input'>
            <Input
              type='number'
              labelText='Duration'
              placeholderText='Enter duration in minutes...'
              onChange={onDurationChange}
              value={duration}
            />
            <p>
              Duration:{' '}
              <span className='course-duration'>
                {duration ? pipeDuration(duration) : null} hours
              </span>
            </p>
          </div>
        </div>
        <div className='course-container__author-selection'>
          <p className='course-title'>Authors</p>
          <ul className='course__authors'>
            {authors.length !== 0 ? (
              authors.map((author) => {
                return (
                  <li className='course__author' key={author.id}>
                    <p>{author.name}</p>
                    <Button
                      buttonText={ADD_AUTHOR_BUTTON_TEXT}
                      onClick={() => onAuthorChosen(author)}
                    />
                  </li>
                );
              })
            ) : (
              <p className='course-authors'>There are no authors</p>
            )}
          </ul>
          <p className='course-title'>Course authors</p>
          <ul className='course__authors'>
            {chosenAuthors.length !== 0 ? (
              chosenAuthors.map((author) => {
                return (
                  <li className='course__author' key={author.id}>
                    <p>{author.name}</p>
                    <Button
                      buttonText={DELETE_AUTHOR_BUTTON_TEXT}
                      onClick={() => onAuthorDeleted(author)}
                    />
                  </li>
                );
              })
            ) : (
              <p className='course-authors'>Authors list is empty</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
