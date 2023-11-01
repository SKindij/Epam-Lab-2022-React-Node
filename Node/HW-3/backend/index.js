// index.js
require('dotenv').config();
const express = require('express') // для створення серверів
  const app = express() // створюємо екземпляр сервера
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const { authRouter } = require('./routers/authRouter')
const { usersRouter } = require('./routers/usersRouter')
const { trucksRouter } = require('./routers/trucksRouter')
const { loadsRouter } = require('./routers/loadsRouter')

const { asyncWrapper } = require('./asyncWrapper')

const { authMiddleware } = require('./middlewares/authMiddleware')

const {
  driverRoleMiddleware
} = require('./middlewares/driverRoleMiddleware')

  console.log('Starting Tech Notes App...')

mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to Atlas MongoDB')

// дозволяє контролювати, які джерела мають доступ до сервера  
  app.use(cors())
// дозволяє обробляти JSON-дані у відповідях на POST-запити
  app.use(express.json())
// логує дані про кожний HTTP-запит  
  app.use(morgan('tiny'))
// 
app.use(express.urlencoded({ extended: false }))

// middleware для обробки статичних файлів із папки '/uploads'
app.use('/static', express.static('src/uploads'))

// обробник маршруту аутентифікації
app.use('/api/auth', authRouter)
app.use('/api/users/me', asyncWrapper(authMiddleware), usersRouter)
app.use('/api/loads', asyncWrapper(authMiddleware), loadsRouter)
app.use(
  '/api/trucks',
  asyncWrapper(authMiddleware),
  asyncWrapper(driverRoleMiddleware),
  trucksRouter
)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))

app.use(errorHandler)

function errorHandler(err, req, res, next) {
  return res.status(400).json({ message: err.message })
}
