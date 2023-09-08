// Registration.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { useHttp } from '../../hooks/useHttp';

import './Registration.css';

const Registration: React.FC = () => {
  const { loading, error, request } = useHttp();
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('Name should not be empty');
  const [emailError, setEmailError] = useState<string>('Email should not be empty');
  const [passwordError, setPasswordError] = useState<string>('Password should not be empty');
  const [formValid, setFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMessage(error?.message || null);
  }, [error]);

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (name.length < 1) {
      setNameError('Name should be more than 2 characters');
    } else {
      setNameError('');
    }
  };

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(e.target.value.toLowerCase())) {
      setEmailError('Please, enter correct email');
    } else {
      setEmailError('');
    }
  };

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const reg = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/;
    if (!reg.test(e.target.value.toLowerCase())) {
      setPasswordError(
        'Password should contain at least one lowercase letter and be more than 7 characters'
      );
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
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

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    try {
      await request('/register', 'POST', { ...newUser });
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
              labelText='Name'
              placeholderText='Enter name'
              value={name}
              name='name'
              onChange={onNameChanged}
              onBlur={blurHandler}
            />
            {nameDirty && nameError && <div className='error'>{nameError}</div>}
          </div>
          <div className='registration__input '>
            <Input
              labelText='Email'
              placeholderText='Enter email'
              type='email'
              value={email}
              name='email'
              onChange={onEmailChanged}
              onBlur={blurHandler}
            />
            {emailDirty && emailError && (
              <div className='error'>{emailError}</div>
            )}
          </div>
          <div className='registration__input'>
            <Input
              labelText='Password'
              placeholderText='Enter password'
              type='password'
              value={password}
              name='password'
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
              type='submit'
              buttonText='Registration'
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
