import React, { FC, useState, ChangeEvent } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import {
  mockedAuthorsList,
  mockedCoursesList,
  CREATE_BUTTON_TEXT,
  CREATE_AUTHOR_BUTTON_TEXT,
  ADD_AUTHOR_BUTTON_TEXT,
  DELETE_AUTHOR_BUTTON_TEXT,
} from '../../constants';
import { pipeDuration } from '../../helpers/pipeDuration';
import { uniqueId } from '../../helpers/uniqueIdGenerator';

import './CreateCourse.css';

interface CreateCourseProps {
  setAddCourse: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCourse:FC<CreateCourseProps> = ({ setAddCourse }) => {
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [duration, setDuration] = useState('');
  const [chosenAuthors, setChosenAuthors] = useState<any[]>([]);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

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

  const onDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const onAuthorChosen = (chosenAuthor: any) => {
    setChosenAuthors([...chosenAuthors, chosenAuthor]);
    setAuthors((authors) => authors.filter((item) => item.id !== chosenAuthor.id));
  };

  const onAuthorDeleted = (deletedAuthor: any) => {
    setChosenAuthors((chosenAuthors) =>
      chosenAuthors.filter((item) => item.id !== deletedAuthor.id)
    );
    setAuthors([...authors, deletedAuthor]);
  };

  const onCourseCreate = () => {
    if (title.length < 2 || description.length < 2 || !chosenAuthors.length || !duration) {
      alert('Please, fill in all fields ');
      return;
    }
    const date = new Date().toLocaleDateString();
    const courseAuthors = chosenAuthors.map((chosenAuthor) => chosenAuthor.id);
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

  return (
    <div className='course-container'>
      <div className='course-container__toolbar'>
        <Input
          labelText='Title'
          placeholderText='Enter title...'
          onChange={onTitleChange}
          value={title}
        />
        <Button buttonText={CREATE_BUTTON_TEXT} onClick={onCourseCreate} />
      </div>
      <Textarea
        labelText='Description'
        placeholderText='Enter description'
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
            <Button buttonText={CREATE_AUTHOR_BUTTON_TEXT} onClick={onAuthorAdded} />
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
              Duration:
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
              chosenAuthors.map((chosenAuthor) => {
                return (
                  <li className='course__author' key={chosenAuthor.id}>
                    <p>{chosenAuthor.name}</p>
                    <Button
                      buttonText={DELETE_AUTHOR_BUTTON_TEXT}
                      onClick={() => onAuthorDeleted(chosenAuthor)}
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
