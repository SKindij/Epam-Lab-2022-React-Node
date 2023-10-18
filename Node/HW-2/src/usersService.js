// usersService.js
// Підключення моделі користувача та бібліотеки bcryptjs
const {User} = require('./models/Users.js');
const bcrypt = require('bcryptjs');
// Генерація "солі" для хешування паролів
const salt = bcrypt.genSaltSync(10);

// Функція для відображення інформації про користувача
const showUser = async (req, res, next) => {
  try {
	// Пошук користувача за ідентифікатором (з токена)
    User.findById(req.user.userId)
      .then((response) => {
        res.json(
          {
            user: {
              _id: response._id,
              username: response.username,
              createdDate: response.createdDate,
            },
          },
        );
      },
      );
  } catch {
    if (err) throw err;
  }
};

// Функція для видалення користувача
const deleteUser = async (req, res, next) => {
  // Знаходження та видалення користувача за ідентифікатором
  User.findByIdAndDelete(req.user.userId)
    .then((user) => {
      res.status(200)
        .send({message: `User ${user.username} deleted successfully`});
    });
};

// Функція для оновлення паролю користувача
const updateUser = async (req, res, next) =>{
  try {
	// Знаходження користувача за ідентифікатором (з токена)
    const user = await User.findById(req.user.userId);
      console.log('LOG (updateUser): ', user);
	// Отримання старого та нового паролів з тіла запиту
    const {oldPassword, newPassword} = req.body;
    // порівнюємо старий та новий паролі
    if (bcrypt.compare(
        String(oldPassword),
        String(user.password),
    )) {
      // хешуємо новий пароль
      user.password = await bcrypt.hash(newPassword, salt);
      return user.save().then(() => {
        res.status(200).send({message: `User changed password successfully`});
      });
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = {
  showUser,
  deleteUser,
  updateUser,
};
