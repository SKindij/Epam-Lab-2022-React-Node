// app.js 
function startApp() {
  const container = document.querySelector('.container');
    // створює заголовок "MyNotes"
    const heading = document.createElement('h1');
    heading.innerHTML = 'MyNotes';
      container.append(heading);

  /*edit profile*/
  const profileBlock = document.createElement('div');
    const profileHeading = document.createElement('h2');
    const changePasswordForm = document.createElement('form');
    const oldPasswordLabel = document.createElement('label');
    const newPasswordLabel = document.createElement('label');
    const oldPasswordInput = document.createElement('input');
    const newPasswordInput = document.createElement('input');
    const changePasswordButton = document.createElement('button');

  // блок для профілю користувача
  profileBlock.classList.add('profile-block');
  oldPasswordInput.classList.add('old-password');
  newPasswordInput.classList.add('new-password');
  changePasswordForm.id = 'change-password';

  profileHeading.innerHTML = 'Change password';
  oldPasswordLabel.innerHTML = 'Old password';
  newPasswordLabel.innerHTML = 'New password';
  oldPasswordInput.placeholder = 'Enter old password';
  newPasswordInput.placeholder = 'Enter new password';
  changePasswordButton.innerHTML = 'Change password';

  oldPasswordLabel.htmlFor = 'old-pass';
  newPasswordLabel.htmlFor = 'new-pass';
  oldPasswordInput.id = 'old-pass';
  newPasswordInput.id = 'new-pass';
  oldPasswordInput.name = 'oldpass';
  newPasswordInput.name = 'newpass';
  oldPasswordInput.type = 'password';
  newPasswordInput.type = 'password';
  oldPasswordInput.required = true;
  newPasswordInput.required = true;
  changePasswordButton.type = 'submit';

  changePasswordForm.addEventListener('submit', changePassword);

  changePasswordForm.append(
    oldPasswordLabel,
    oldPasswordInput,
    newPasswordLabel,
    newPasswordInput,
    changePasswordButton
  );
  profileBlock.append(profileHeading, changePasswordForm);

  /*add all elements to DOM container*/
  container.append(heading, profileBlock);

  console.log('LOG (startApp): ', 'розпочинаємо роботу програми...');

  /*check if user loged in*/
  const jwt_token = window.localStorage.getItem('jwt_token');
  // в залежності від того, чи користувач увійшов у систему
    if (jwt_token) { showNotes();
    } else { getLoginForm();
    }
}
// Ця функція починає роботу додатка.
startApp();

// Ця функція генерує форму для входу в систему або реєстрації користувача.
function getLoginForm() {
  const container = document.querySelector('.container');
  const loginBlock = document.createElement('div');
  const loginBlockHeading = document.createElement('h2');
  loginBlock.classList.add('login-block');

  const loginForm = document.createElement('form');
  const loginUsernameLabel = document.createElement('label');
  const loginUsernameInput = document.createElement('input');
  const loginPasswordLabel = document.createElement('label');
  const loginPasswordInput = document.createElement('input');
  const submitButton = document.createElement('button');

  const registerLink = document.createElement('a');
  registerLink.classList.add('register-link');

  loginBlockHeading.innerHTML = 'Login please:';

  loginForm.id = 'login-form';
  loginForm.action = '#';

  loginUsernameLabel.innerHTML = 'Username';
  loginUsernameLabel.htmlFor = 'uname-login';
  loginUsernameInput.placeholder = 'Enter username';
  loginUsernameInput.id = 'uname-login';
  loginUsernameInput.name = 'username';
  loginUsernameInput.type = 'text';
  loginUsernameInput.required = true;

  loginPasswordLabel.innerHTML = 'Password';
  loginPasswordLabel.htmlFor = 'password-login';
  loginPasswordInput.placeholder = 'Enter password';
  loginPasswordInput.id = 'password-login';
  loginPasswordInput.name = 'password';
  loginPasswordInput.type = 'password';
  loginPasswordInput.required = true;

  submitButton.innerHTML = 'Login';
  submitButton.type = 'submit';

  registerLink.innerHTML = 'Register';
  registerLink.href = '#';

  loginForm.append(
    loginUsernameLabel, loginUsernameInput,
    loginPasswordLabel, loginPasswordInput,
    submitButton
  );
  loginBlock.append(loginBlockHeading, loginForm, `or`, registerLink);
  container.append(loginBlock);

  loginForm.addEventListener('submit', submitLoginHandler);
  registerLink.addEventListener('click', getRegisterForm);
}

// Відображає форму реєстрації, якщо користувач натиснув на "Register". 
function getRegisterForm(e) {
    console.log('LOG (getRegisterForm): ', e);
  const container = document.querySelector('.container');
  const loginBlock = document.querySelector('.login-block');
    // приховуємо блок входу в систему
    loginBlock.style.display = 'none';

  const registerBlock = document.createElement('div');
  const registerBlockHeading = document.createElement('h2');
  registerBlock.classList.add('register-block');

  const registerForm = document.createElement('form');
  const registerUsernameLabel = document.createElement('label');
  const registerUsernameInput = document.createElement('input');
  const registerPasswordLabel = document.createElement('label');
  const registerPasswordInput = document.createElement('input');
  const submitButton = document.createElement('button');

  const loginLink = document.createElement('a');
  loginLink.classList.add('login-link');

  registerBlockHeading.innerHTML = 'Register please:';

  registerForm.id = 'register-form';
  registerForm.action = '#';

  registerUsernameLabel.innerHTML = 'Username';
  registerUsernameLabel.htmlFor = 'uname-register';
  registerUsernameInput.placeholder = 'Enter username';
  registerUsernameInput.id = 'uname-register';
  registerUsernameInput.name = 'username';
  registerUsernameInput.type = 'text';
  registerUsernameInput.required = true;

  registerPasswordLabel.innerHTML = 'Password';
  registerPasswordLabel.htmlFor = 'password-register';
  registerPasswordInput.placeholder = 'Enter password';
  registerPasswordInput.id = 'password-register';
  registerPasswordInput.name = 'password';
  registerPasswordInput.type = 'password';
  registerPasswordInput.required = true;

  submitButton.innerHTML = 'Register';
  submitButton.type = 'Submit';

  loginLink.innerHTML = 'Register';
  loginLink.href = '#';

  registerForm.append(
    registerUsernameLabel,
    registerUsernameInput,
    registerPasswordLabel,
    registerPasswordInput,
    submitButton
  );
  registerBlock.append(registerBlockHeading, registerForm);
  container.append(registerBlock);

  // const registerMessage = document.querySelector('.register-message');
  registerForm.addEventListener('submit', submitRegisterHandler);
}

// відповідає за відправку даних на сервер для створення нового облікового запису
function submitRegisterHandler(e) {
  e.preventDefault();

  const registerForm = document.getElementById('register-form');
  const loginBlock = document.querySelector('.login-block');
  const registerBlock = document.querySelector('.register-block');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const body = new FormData(registerForm);

  let raw = JSON.stringify({
    username: body.get('username'),
    password: body.get('password'),
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  // API-маршрут = кореневий URL сервера + шлях із fetch
  fetch('/api/auth/register', requestOptions)
    .then((response) => {
      response.json();
    })
    .then((result) => {
      registerBlock.style.display = 'none';
      loginBlock.style.display = 'block';

      console.log('LOG (submitRegister): ', result);
    })
    .catch((error) => console.log('error', error));
}

// відповідає за відправку даних входу на сервер для аутентифікації користувача
function submitLoginHandler(e) {
  e.preventDefault();
  // отримуємо посилання на елемент форми для входу за id
  const loginForm = document.getElementById('login-form');
  // використовуємо вбудований у JS об'єкт (набір HTTP-заголовків)
  const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

  const body = new FormData(loginForm);
  // об'єкт для відправлення імені та паролю на сервер
  let raw = JSON.stringify({
    username: body.get('username'),
    password: body.get('password'),
  });
  // об'єкт містить налаштування для відправлення запиту на сервер
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow', // слідуй за перенаправленнями
  };
  // відправляємо запит на сервер із налаштуваннями
  fetch('/api/auth/login', requestOptions)
    // перетворюємо отриману відповідь з JSON на JavaScript
    .then((response) => response.json())
	// обробляємо дані, отримані від сервера
    .then((result) => {
      // зберігаємо токен доступу у локальному сховищі браузера
      window.localStorage.setItem('jwt_token', result.jwt_token);
      // якщо отриманий токен доступу не пустий, то...
      if (result.jwt_token) {
		console.log('LOG (submitLogin): Ok!');
        setTimeout(() => {
          document.querySelector('.login-block').style.display = 'none';
          // відображає список нотаток після успішного входу
		  showNotes();
        }, 0);
      }
    })
    .catch((error) => console.log('error', error));
}

// відображає сторінку з нотатками
function showNotes() {
  const registerBlock = document.querySelector('.register-block');
  const loginBlock = document.querySelector('.login-block');
  // створення блоку для нотаток на сторінці
  const notesBlock = document.createElement('div');
  const container = document.querySelector('.container');
  const header = document.createElement('div');
  const editProfileLink = document.createElement('a');
  const logOut = document.createElement('a');
  // блоку, який буде вміщувати список нотаток користувача
  const notesContainer = document.createElement('div');
  const heading = document.createElement('h2');
  // блок, який містить поле введення тексту та кнопку створення
  const newNoteContainer = document.createElement('div');
    const noteTextInput = document.createElement('input');
    const createNoteButton = document.createElement('button');

  header.classList.add('header');
  editProfileLink.classList.add('edit-profile');
  logOut.classList.add('logout');
  notesContainer.classList.add('notes-container');
  notesBlock.classList.add('notes-block');
  noteTextInput.classList.add('note-text-input');
  createNoteButton.classList.add('create-note');
  newNoteContainer.classList.add('new-note-container');

  notesBlock.style.display = 'flex';

  editProfileLink.innerHTML = 'Edit Profile';
  logOut.innerHTML = 'Log out';
  heading.innerHTML = 'Notes';
  createNoteButton.innerHTML = 'Create note';

  editProfileLink.href = '#';
  logOut.href = '/';
  // додаємо обробники подій
  createNoteButton.addEventListener('click', createNote);
  editProfileLink.addEventListener('click', editProfile);
  logOut.addEventListener('click', logMeOut);

  container.append(notesBlock);
  notesBlock.append(
    editProfileLink,
    logOut,
    heading,
    newNoteContainer,
    notesContainer
  );
  newNoteContainer.append(noteTextInput, createNoteButton);
  // для відображення списку нотаток користувача
  showNotesList();
}

// отримує список нотаток для відображення на сторінці
async function showNotesList() {
  const notesContainer = document.querySelector('.notes-container');
  notesContainer.innerHTML = '';

  const myNotes = await getNotesList();

  if (!myNotes) {
    const noNotesMessage = document.createElement('span');
    noNotesMessage.innerHTML = 'You have no notes yet, make one';
    notesBlock.append(noNotesMessage);
  }

  myNotes.forEach((element) => {
    const note = document.createElement('div');
    const noteText = document.createElement('label');
    const noteEditText = document.createElement('input');
    const noteEditButton = document.createElement('button');
    const noteDeleteButton = document.createElement('button');
    const noteDoneButton = document.createElement('button');

    note.classList.add('note');
    noteText.classList.add('text');
    noteEditText.classList.add('edit-text');
    noteEditButton.classList.add('note-edit-save');
    noteDeleteButton.classList.add('note-delete');
    noteDoneButton.classList.add('note-done');

    note.dataset.id = element._id;

    noteEditButton.innerHTML = 'Edit';
    noteDeleteButton.innerHTML = `Delete`;
    noteDoneButton.innerHTML = `Mark done`;

    noteText.innerHTML = element.text;
    noteEditText.value = noteText.innerHTML;

    notesContainer.append(note);
    note.append(
      noteText,
      noteEditText,
      noteEditButton,
      noteDeleteButton,
      noteDoneButton
    );

    noteDeleteButton.addEventListener('click', deleteNote);
    noteEditButton.addEventListener('click', editNote);
    noteDoneButton.addEventListener('click', markNote);
  });
}

// додає нову нотатку на сервер
async function createNote() {
	console.log('LOG1 (createNote): start create function');
  const noteTextInput = document.querySelector('.note-text-input');
  const jwt_token = window.localStorage.getItem('jwt_token');
    console.log('LOG2 (createNote): received jwt_token');
  const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + jwt_token);
    myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    text: noteTextInput.value,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  await fetch('http://localhost:8080/api/notes/', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      noteTextInput.value = '';
      showNotesList();
    })
    .catch((error) => console.log('error', error));
}

// видаляє нотатку за її ідентифікатором на сервері
async function deleteNote(e) {
	console.log('LOG1 (deleteNote): start delete function');
  const jwt_token = window.localStorage.getItem('jwt_token');
    console.log('LOG2 (deleteNote): received jwt_token');
  const noteId = e.path[1].dataset.id;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + jwt_token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(`http://localhost:8080/api/notes/${noteId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      noteDeleteButton.removeEventListener('click', deleteNote);
      showNotesList();
      // console.log(result);
    })
    .catch((error) => console.log('error', error));
}

// дозволяє користувачеві редагувати нотатку,
function editNote(e) {
  // отримуємо батьківський елемент кнопки "Edit"
  const note = this.parentNode;
  // посилання на HTML-елементи label та input для цього контейнера
  const noteLabel = note.querySelector('label');
  const noteInput = note.querySelector('input');

    noteLabel.style.display = 'none';
    noteInput.style.display = 'block';

  noteInput.placeholder = noteLabel.innerHTML;

  e.target.addEventListener('click', editNote);
  // видаляємо обробник події кнопки "Edit"
  e.target.removeEventListener('click', editNote);
  e.target.innerHTML = 'Save';
  // додаємо обробник події для кнопки "Save"
  e.target.addEventListener('click', saveNote);
}

// зберігає редаговану нотатку на сервері
function saveNote(e) {
	console.log('LOG1 (saveNote): start save function');
  // отримання токену, встановленого під час входу користувача 
  const jwt_token = window.localStorage.getItem('jwt_token');
    console.log('LOG2 (saveNote): received jwt_token');
  // визначаємо, яку саме нотатку користувач хоче відредагувати
    console.log('LOG3 (saveNote): ', e);
  // const note = e.path[1];   
  const note = e.target.parentNode;
    if (!note) {
      console.error('Note element is undefined');
      return;
    }
    console.log('LOG4 (saveNote): ', note);
  // const noteId = e.path[1].dataset.id;
  const noteId = e.target.parentNode.dataset.id;
    if (!noteId) {
      console.error('Note ID is not found');
      return;
    }
	console.log('LOG5 (saveNote): ', noteId);
  const noteLabel = note.querySelector('.text');
  const noteInput = note.querySelector('.edit-text');
    if (!noteLabel || !noteInput) {
      console.error('Note label or input is not found');
      return;
    }
  // створення об'єкта заголовків із токеном
  const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + jwt_token);
  // JSON-представлення нового тексту нотатки
  const raw = JSON.stringify({text: noteInput.value});

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
    console.log('LOG4 (saveNote): start fetch(noteId)');
  // запит до URL, де {noteId} - ідентифікатор нотатки, яку користувач редагує.
  fetch(`http://localhost:8080/api/notes/${noteId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      noteLabel.innerHTML = noteInput.value;
      e.target.innerHTML = 'Edit';
      noteLabel.style.display = 'block';
      noteInput.style.display = 'none';
    })
    .catch((error) => console.log('error', error));
}

// 
async function getNotesList() {
  // отримання токену доступу з локального сховища
  const jwt_token = window.localStorage.getItem('jwt_token');
  // cтворення об'єкта "Headers" для налаштування HTTP-заголовків
  let myHeaders = new Headers();
  // додавання рядка (токену доступу) до заголовків
  myHeaders.append('Authorization', 'Bearer ' + jwt_token);
  myHeaders.append('Content-Type', 'application/json');
  // налаштування параметрів для HTTP-запиту
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let notesList;
  // виконання HTTP-запиту для отримання списку нотаток
  await fetch('http://localhost:8080/api/notes/', requestOptions)
    // розбір JSON-відповіді
    .then((response) => response.json())
	// збереження списку нотаток
    .then((result) => {
      notesList = result.notes;
    })
    .catch((error) => console.log('error', error));
      console.log('LOG (getNotesList):', notesList);
	// повернення списку нотаток з функції
    return notesList;
}

// 
function logMeOut() {
  localStorage.removeItem('jwt_token');
  document.location.reload();
}

// дозволяє позначити нотатку як виконану або невиконану
function markNote(e) {
    console.log('LOG (markNote): ',e);
  const note = e.path[1];
    if (!note) {
      console.error('Note element is undefined');
      return;
    }
  const noteId = e.path[1].dataset.id;
    if (!noteId) {
      console.error('Note ID is not found');
      return;
    }
  const jwt_token = window.localStorage.getItem('jwt_token');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + jwt_token);

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`http://localhost:8080/api/notes/${noteId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.note.completed === true) {
        note.classList.add('completed');
        e.target.innerHTML = 'Mark undone';
      } else {
        note.classList.remove('completed');
        e.target.innerHTML = 'Mark done';
      }
    })
    .catch((error) => console.log('error', error));
}

// відображає блок редагування, який дозволяє змінити пароль
function editProfile(e) {
  document.querySelector('.notes-block').style.display = 'none';
  document.querySelector('.profile-block').style.display = 'flex';
}

// відправляє запит на сервер для зміни паролю користувача
function changePassword(e) {
  e.preventDefault();
  console.log(e);

  const oldPass = document.querySelector('.old-password');
  const newPass = document.querySelector('.new-password');

  const jwt_token = window.localStorage.getItem('jwt_token');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + jwt_token);
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    oldPassword: oldPass.value,
    newPassword: newPass.value,
  });

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('http://localhost:8080/api/users/me', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      document.querySelector('.profile-block').style.display = 'none';
      document.querySelector('.notes-block').style.display = 'flex';

      console.log(result);
    })
    .catch((error) => console.log('error', error));
}
