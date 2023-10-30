// services/usersService
// модель для взаємодії з користувачами в базі даних
const { User } = require('../models/User')
// бібліотека для шифрування паролів
const bcrypt = require('bcryptjs')

// додає нового користувача до бази даних
const saveUser = async ({ email, password, role }) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    role
  })
  return await user.save()
}

// знаходить користувача за його email
  const getUserByEmail = async (email) => {
    return await User.findOne({ email })
  }
// знаходить користувача за його ID
  const getUserByID = async (id) => {
    return await User.findById(id)
  }
// видаляє користувача за його унікальним ID
  const findUserByIDAndDelete = async (id) => {
    return await User.findByIdAndDelete(id)
  }
  
// оновлює певного користувача з новими даними
const findUserByIDAndUpdate = async (id, data) => {
  return await User.findByIdAndUpdate(id, data)
}
// оновлює користувача за з новими даними
const findUserByEmailAndUpdate = async (email, data) => {
  return await User.findOneAndUpdate({ email }, data)
}

// для завантаження аватарки користувача
  const uploadUserAvatar = async (req, res, next) => {
	// можлива логіка завантаження аватарки тут
    upload.single('avatar')
  }

module.exports = {
  saveUser,
  getUserByEmail,
  getUserByID,
  findUserByIDAndDelete,
  findUserByIDAndUpdate,
  findUserByEmailAndUpdate,
  uploadUserAvatar
}
