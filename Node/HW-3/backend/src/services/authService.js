// services/authService.js
// допомагає генерувати випадкові паролі
  const passwordGenerator = require('generate-password')
// для надсилання електронних листів
  const nodemailer = require('nodemailer')

// генерує новий пароль з обраною довжиною та включеними цифрами
const getNewGeneratedPassword = () => {
  return passwordGenerator.generate({
    length: 16,
    numbers: true
  })
}

// надсилає електронний лист з новим паролем на вказану адресу
const sendEmailWithNewPassword = async (email, password) => {
  // cтворюємо транспортер для відправлення листів через сервіс Gmail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  // надсилаємо лист зі згенерованим паролем на вказану адресу
  return await transporter.sendMail({
    from: process.env.EMAIL_LOGIN, // від кого
    to: email, // кому
    subject: 'New password Freight Trucks App', // тема листа
    text: 'New password Freight Trucks App', // текстова версія листа (необов'язкова)
    html: `<h2>Hello from Freight Trucks App</h2>
	    <p>Your new password:</p><p>${password}</p>` // HTML-версія листа
  })
}

module.exports = {
  getNewGeneratedPassword,
  sendEmailWithNewPassword
}
