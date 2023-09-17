// filesService.js
// requires...
const fs = require('fs');
const path = require('path');
const {
	addToProtectedFiles,
	checkPassword,
} = require('./helpers');
// constants...
// папка, в якій будуть зберігатися файли
const FILE_DIR = './files/';
const EXTENSIONS = ['.log', '.txt', '.json', '.yaml', '.xml', '.js'];

// функція, яка перевіряє існування файлу з вказаним іменем.
function fileExists(filename) {
  try {
    const filePath = path.join(FILE_DIR, filename);
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Error checking file existence: ${error.message}`);
    return false;
  }
}

function createFile (req, res, next) {
  // code to create the file
  const { filename, content, password } = req.body;
  // перевірка, чи передані обов'язкові параметри
  if (!filename || !content) {
    next({
      status: 400,
      message: "Both filename and content are required.",
    });
    return;
  }
  // визначаємо розширення файлу
  const fileExt = path.extname(filename);
  if (!EXTENSIONS.includes(fileExt)) {
    next({
      status: 400,
      message: 'App supports log, txt, json, yaml, xml, js file extensions',
    });
    return;
  }

  try {   
    // перевірка, чи існує файл з таким іменем
    const filePath = path.join(FILE_DIR, filename);
    if (fs.existsSync(filePath)) {
      next({
        status: 400,
        message: 'A file with this name already exists',
      });
      return;      
    }
    // перевірка, чи передано пароль, і додавання файлу до захищених файлів
    if (password) {addToProtectedFiles(req);}
    // зберігання файлу з вказаним ім'ям та вмістом
    fs.writeFileSync(filePath, content);
    res.status(200).send({ "message": "File created successfully" });
  } catch (error) {
    console.error(`Error creating file: ${error.message}`);
    res.status(500).send({ message: 'Server error' });
  }
}

function getFiles (req, res, next) {
  // Your code to get all files.
  fs.readdir(FILE_DIR, (err, files) => {
    if (err) {
      next({ status: 400, message: 'Client error' });
      return;
    }

    res.status(200).send({
      message: 'Success',
      files: files,
    });
  });
}

const getFile = (req, res, next) => {
  try {
    let filename = req.params.filename;
    // лог для відстеження запиту
    console.log(`GET request for file: ${filename}`);
    // завантажуємо дані з файлу 'protectedFiles.json' при кожному запиті
    const protectedFilesJSON = fs.readFileSync('./protectedFiles.json', 'utf8');
    // перевірка, чи існує файл з таким іменем
    if (!fileExists(filename)) {
      // лог для відстеження помилки
      console.error(`File not found: ${filename}`);
      next({
        status: 400,
        message: `No file with '${filename}' filename found`,
      });
      return;      
    }
    // перевірка, чи файл захищений і чи передано пароль
    const isProtectedFile = JSON.parse(protectedFilesJSON).some(
      (item) => item.filename === filename
    );
    if (isProtectedFile && !req.query.password) {
      // лог для відстеження помилки
      console.error(`Protected file '${filename}' requires a password.`);
      next({
        status: 400,
        message: `This is a protected file. Provide the password.`,
      });
      return;  
    }

    if (isProtectedFile) {
      // перевірка пароля та надсилання відповіді з вмістом захищеного файлу
      checkPassword(filename, req.query.password, res);
    } else {
      // отримання вмісту незахищеного файлу
      fs.readFile(path.join(FILE_DIR, filename), 'utf-8', (err, data) => {
        if (err) {
          // лог для відстеження помилки
          console.error(`Error reading file: ${err.message}`);  
          next({
            status: 400,
            message: `No file with '${filename}' filename found`,
          });
          return;
        }
        // лог для відстеження успішної операції
        console.log(`Sending file: ${filename}`);
        res.status(200).send({
          message: 'Success',
          filename: path.basename(path.join(FILE_DIR, filename)),
          content: data,
          extension: path.extname(filename).slice(1),
          uploadedDate: fs.statSync(path.join(FILE_DIR, filename)).birthtime,
        });
      });
    } 
  } catch (err) {
    // лог для відстеження помилки
    console.error(`Server error: ${err.message}`);
    res.status(500).send({message: 'Server error',});
  }  
}

// Other functions - editFile, deleteFile
function editFile(req, res, next) {
  let filename = req.url.slice(1);
  // отримати оновлений текст з тіла запиту
  const { updatedText } = req.body;

  if (!fs.existsSync(path.join(FILE_DIR, filename))) {
    next({
      status: 400,
      message: `No file with '${filename}' filename found`,
    });
    return;
  }

  fs.appendFile(path.join(FILE_DIR, filename), updatedText, (err) => {
    if (err) {
      next({
        status: 400,
        message: 'Something went wrong',
      });
      return;
    }

    res.status(200).send({ message: 'All changes are saved successfully' });
  });
}

function deleteFile(req, res, next) {
  let filename = req.url.slice(1);

  if (!fs.existsSync(path.join(FILE_DIR, filename))) {
    next({
      status: 400,
      message: `No file with '${filename}' filename found`,
    });
    return;
  }

  fs.unlink(path.join(FILE_DIR, filename), (err) => {
    if (err) {
      next({
        status: 400,
        message: 'Something went wrong',
      });
      return;
    }

    res.status(200).send({ message: 'File deleted successfully' });
  });
}

// path.extName('file.txt') ---> '.txt'
// fs.writeFile ({ flag: 'a' }) ---> adds content to the file

module.exports = {
  createFile,
  getFiles,
  getFile,
  editFile,
  deleteFile
}
