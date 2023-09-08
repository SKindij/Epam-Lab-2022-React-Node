// Registration.tsx
import { useEffect, useState, FC, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { useHttp } from '../../hooks/useHttp';

import './Registration.css';

const Registration:FC = () => {
  const { loading, error, request } = useHttp();
  // стан для зберігання повідомлення про помилку під час реєстрації
  const [message, setMessage] = useState<string | null>(null);
  // стани для зберігання значень полів форми
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // стани для відстеження, чи було поле змінено
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  // для зберігання повідомлень про помилки для кожного поля форми
  const [nameError, setNameError] = useState<string>('Name should not be empty');
  const [emailError, setEmailError] = useState<string>('Email should not be empty');
  const [passwordError, setPasswordError] = useState<string>('Password should not be empty');
  // стан, що показує, чи є форма валідною
  const [formValid, setFormValid] = useState<boolean>(false);
  
  // за допомогою хука отримуємо функцію для переходу між сторінками
  const navigate = useNavigate();
  
  // для слідкування за змінами error та встановлення повідомлення про помилку
  useEffect(() => {
    // якщо error існує, то присвоюється значення message, інакше встановлюється null
    setMessage(error?.message || null);
  }, [error]);
  
  // для визначення валідності форми на основі значень
  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  // функції, які викликаються при зміні значень відповідних полів форми
  // також перевіряють валідність введених даних і встановлюють повідомлення про помилку
  const onNameChanged = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (name.length < 2) {
      setNameError('Name should be more than 2 characters');
    } else {
      setNameError('');
    }
  };
  // функція отримує об'єкт події e, який представляє зміни в полі введення <input>
  const onEmailChanged = (e:ChangeEvent<HTMLInputElement>) => {
    // значення, введене користувачем, присвоюється змінній email
    setEmail(e.target.value);
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	// перевірка введеного email на відповідність регулярному виразу
    if (!reg.test(e.target.value.toLowerCase())) {
      setEmailError('Please, enter correct email');
    } else {
      setEmailError('');
    }
  };

  const onPasswordChanged = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
	// будь-які символи можуть знаходитися між цифрами в паролі
	// перевіряє наявність малих літер (a-z) 
	// пароль повинен закінчуватися без пробілів
    const reg = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/;
    if (!reg.test(e.target.value.toLowerCase())) {
      setPasswordError(
        'Password should contain at least one lowercase letter and be more than 7 characters'
      );
    } else {
      setPasswordError('');
    }
  };
  // функція використовується для обробки події втрати фокусу (blur) на інпутах форми
  const blurHandler = (e:FocusEvent<HTMLInputElement>) => {
    // ключовий момент цієї функції - це використання e.target.name
	// у браузері, коли відбувається подія втрати фокусу на полі вводу, 
	// властивість name цього поля автоматично заповнюється іменем атрибута name, 
	// який призначений для цього інпута в HTML-коді
    switch (e.target.name) {
	  // дозволяє ідентифікувати, до якого поля відноситься подія втрати фокусу
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  // функція викликається при подачі форми
  // мета - відправити дані нового користувача на сервер для реєстрації
  const formSubmit = async (event:FormEvent<HTMLFormElement>) => {
    //  запобігає стандартній поведінці браузера - перезавантаженню сторінку
    event.preventDefault();
	// новий об'єкт містить дані, введені користувачем у формі
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    try {
	  // асинхронна ф-ція для виконання HTTP-запитів на сервер
      await request('/register', 'POST', { ...newUser });
	  // виконується перенаправлення на сторінку входу
      navigate('/login');
    } catch (e) {}
  };

  return (
    <div className='registration__container'>
      <div className='registration'>
        <h2 className='registration__header registration__text'>
          Registration
        </h2>
        <form className='registration__form' onSubmit={formSubmit}>
          <div className='registration__input'>
            <Input
              labelText='Name' placeholderText='Enter name'
              value={name} name='name'
              onChange={onNameChanged} onBlur={blurHandler}
            />
            {nameDirty && nameError && <div className='error'>{nameError}</div>}
          </div>
          <div className='registration__input '>
            <Input
              labelText='Email' placeholderText='Enter email'
              type='email' value={email} name='email'
			  onChange={onEmailChanged} onBlur={blurHandler}
            />
            {emailDirty && emailError && (
              <div className='error'>{emailError}</div>
            )}
          </div>
          <div className='registration__input'>
            <Input
              labelText='Password' placeholderText='Enter password'
              type='password' value={password} name='password'
              onChange={onPasswordChanged}
              onBlur={blurHandler}
            />
            {passwordDirty && passwordError && (
              <div className='error'>{passwordError}</div>
            )}
          </div>
          <div className='registration__btn registration__text'>
            <Button
              disabled={!formValid || loading}
              type='submit' buttonText='Registration'
            />
          </div>
          <div className='error'>{message}</div>
        </form>
        <div className='registration__text'>
          <span>If you have an account you can </span>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
