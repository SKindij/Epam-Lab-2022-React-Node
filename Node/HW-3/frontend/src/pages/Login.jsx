// pages/Login.jsx
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

// імпортуємо компоненти з бібліотеки Material-UI
import {
  Box, Link, Grid, Paper, Avatar, Button, 
  TextField, Typography, CssBaseline
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'


export default function LoginPage() {
  const showSnackbar = useSnackbar()
  const navigate = useNavigate()

  // хук для отримання функцій автентифікації та ролі користувач
  const { setAuth, setRole } = useAuth()
    // стани для зберігання даних форми
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // функції для оновлення станів при зміні вмісту полів форми
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

  // обробник подання форми для входу користувача.
  const handleSubmit = async (event) => {
    // спиняємо стандартну поведінку (перезавантаження сторінки)
    event.preventDefault()
    // збираємо дані з полів форми
    const credentials = { email, password }

    try {
      // очищаємо роль, якщо вона була встановлена раніше
        sessionStorage.setItem('role', '')
      // виконуємо запит на сервер для автентифікації користувача
        const res = await axios.post('/api/auth/login', credentials)
      // отримуємо токен автентифікації та роль з відповіді сервера
        const jwt_token = res?.data?.jwt_token
        const role = res?.data?.role

        // зберігаємо токен автентифікації в сесійному сховищі
          sessionStorage.setItem('jwt_token', jwt_token)
        // встановлюємо токен в контексті програми
          setAuth(jwt_token)
        // зберігаємо роль користувача в сесійному сховищі
          sessionStorage.setItem('role', role)
        // встановлюємо роль в контексті програми
          setRole(role)
    // перенаправляємо користувача на сторінку відповідно до його ролі
      navigate(
        role === 'SHIPPER' ? '/dashboard/shipper' : '/dashboard/driver',
        { replace: true }
      )
    } catch (error) {
      const errorMessage = error?.response?.data.message
      // відображаємо сповіщення про помилку
        showSnackbar(errorMessage, 'error')
    }
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid item
        xs={false} sm={4} md={7} sx={{
          backgroundImage: 'url(/parcel.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <Grid item
        xs={12} sm={8} md={5}
		component={Paper}
        elevation={6} square
      >
        <Box
          sx={{
            my: 8, mx: 4, display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required fullWidth
              id='email' label='Email Address'
              name='email' autoFocus
              onChange={handleEmailChange}
            />

            <TextField
              margin='normal'
              required fullWidth
              name='password' label='Password'
              type='password' id='password'
              onChange={handlePasswordChange}
            />

            <Button type='submit'
              fullWidth variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to='/reset'
                  variant='body2'
                >
                  {'Forgot password?'}<br />
                  {""}
                </Link>
              </Grid>

              <Grid item>
                <Link
                  component={RouterLink}
                  to='/register'
                  variant='body2'
                >
                  {"Don't have an account? Sign Up"}<br />
                  {""}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}