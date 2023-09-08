// Login.tsx
import { useContext, useEffect, useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { AuthContext } from '../../context/AuthContext';

import { useHttp } from '../../hooks/useHttp';

import './Login.css';

const Login = () => {
  // отримання контексту авторизації з AuthContext
	const auth = useContext(AuthContext);
	const { loading, error, request } = useHttp();
  // стан для зберігання повідомлення про помилку
	const [message, setMessage] = useState<string | null>(null);
  // стан для зберігання введених даних	
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
  // стани для відстеження того, чи було відредаговано вхідні поля
	const [emailDirty, setEmailDirty] = useState<boolean>(false);
	const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  // стани для відстеження помилок у введених даних
	const [emailError, setEmailError] = useState<string>('Email should not be empty');
	const [passwordError, setPasswordError] = useState<string>(
		'Password should not be empty'
	);
  // стан для відстеження валідності форми	
	const [formValid, setFormValid] = useState<boolean>(false);

  //  якщо виникає помилка у error, вона зберігається у стані message
	useEffect(() => {
		setMessage(error);
	}, [error]);
  // якщо ж помилок немає, то форма вважається валідною
	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [emailError, passwordError]);

  // обробники подій для введених даних:
	const onEmailChanged = (e:ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (!reg.test(e.target.value.toLowerCase())) {
			setEmailError('Please, enter correct email');
		} else {
			setEmailError('');
		}
	};

	const onPasswordChanged = (e:ChangeEvent<HTMLInputElement>) => {
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

  // обробник подій для втрати фокусу:
	const blurHandler = (e:FocusEvent<HTMLInputElement>) => {
		switch (e.target.name) {
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

  // обробник подій для відправки форми:
	const formSubmit = async (event:FormEvent<HTMLFormElement>) => {
		const newUser = {
			password,
			email,
		};
		event.preventDefault();
		try {
		// відбувається відправка даних на сервер для авторизації
			const data = await request(`/login`, 'POST', { ...newUser });
			const token = data.result.substring(7);
			const username = data.user.name;
			auth.login(token, username);
		} catch (e) {}
	};
	return (
		<div className='login__container'>
			<div className='login'>
				<h2 className='login__header login__text'>Login</h2>
				<form className='login__form' onSubmit={formSubmit}>
					<div className='login__input'>
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
					<div className='login__input'>
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
					<div className='login__btn login__text'>
						<Button
							type='submit'
							buttonText='Login'
							disabled={!formValid || loading}
						/>
					</div>
					<div className='error'>{message ? message.message : null}</div>
				</form>
				<div className='login__text'>
					<span>If you don't have an account you can </span>
					<Link to='/registration'>Sign Up</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
