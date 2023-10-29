// pages/Registration.jsx
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import axios from '../api/axios'
// компоненти з бібліотеки Material-UI
import {
  InputLabel, MenuItem, Select, Box, Link,
  Grid, Paper, Button, Avatar, TextField,
  Typography, FormControl, CssBaseline
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import useSnackbar from '../hooks/useSnackbar'

export default function RegistrationPage() {
  const navigate = useNavigate()
    // для зберігання даних форми (email, password, role)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('SHIPPER')

  // функції для оновлення станів при зміні вмісту полів форми
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleRoleChange = (event) => {
    setRole(event.target.value)
  }

  // кастомний хук для відображення сповіщень
  const showSnackbar = useSnackbar()

// обробник подання форми для реєстрації користувача
  const handleSubmit = async (event) => {
    event.preventDefault()

    const credentials = { email, password, role }
    // використовуємо Axios для відправки POST-запиту на сервер
    await axios
      .post('/api/auth/register', credentials)
      .then((res) => {
        const message = res.data.message
        showSnackbar(message, 'success')
        navigate('/login')
      })
      .catch((error) => {
        const errorMessage = error?.response?.data.message

        showSnackbar(errorMessage, 'error')
      })
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid item
        xs={false} sm={4} md={7}
        sx={{
          backgroundImage:'public/parcel.png',
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
            flexDirection: 'column', alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Sign up in the app (Зареєструйтеся в додатку)
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

            <FormControl fullWidth margin='normal'>
              <InputLabel id='demo-simple-select-label'>
                Register as (Зареєструватися як)
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={role} label='Register as'
                fullWidth
                onChange={handleRoleChange}
              >
                <MenuItem value={'SHIPPER'}>Shipper (Вантажовідправник)</MenuItem>
                <MenuItem value={'DRIVER'}>Carrier driver (Водій-перевізник)</MenuItem>
              </Select>
            </FormControl>

            <Button
              type='submit' fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up (Зареєструватися)
            </Button>

            <Grid container>
              <Grid item>
                <Link
                  component={RouterLink}
                  to='/login'
                  variant='body2'
                >
                  {'Already have an account? Sign In'}<br />
                  {'Вже маєте аккаунт? Увійдіть'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}