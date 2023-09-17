// helpers.js
const fs = require('fs');
const path = require('path');
// визначення шляху до теки, де зберігаються файли
const dirPath = path.join(__dirname, 'files');
// функція для читання файлу 'protectedFiles.json'
function readProtectedFiles() {
	try {
	  const protectedFilesJSON = fs.readFileSync(path.join(__dirname, 'protectedFiles.json'), 'utf8');
	  return JSON.parse(protectedFilesJSON);
	} catch (error) {
	  console.error('Error reading protectedFiles.json:', error.message);
	  return [];
	}
}
// ф-ція для запису даних у файл 'protectedFiles.json'
function writeProtectedFiles(data) {
	try {
	  fs.writeFileSync(path.join(__dirname, 'protectedFiles.json'), JSON.stringify(data, null, 2), 'utf8');
	} catch (error) {
	  console.error('Error writing protectedFiles.json:', error.message);
	}
}

// функція для додавання файлу до списку захищених файлів
function addToProtectedFiles(req) {
  const { filename, password } = req.body;
	// отримуємо список захищених файлів
	const protectedFiles = readProtectedFiles();
    // створення об'єкта, що представляє новий файл для захисту
	const file = { filename, password };
    // додавання нового файлу до списку захищених файлів
	protectedFiles.push(file);
    // запис оновленого списку в файл 'protectedFiles.json'
	writeProtectedFiles(protectedFiles);
    console.log('Added to protected files');
}
// ф-ція перевірки пароля та повернення вмісту захищеного файлу, якщо пароль правильний
function checkPassword(filename, password, res) {
  // Отримуємо список захищених файлів
  const protectedFiles = readProtectedFiles();
  // лог для відстеження операції
  console.log(`Checking password for file: ${filename}`);
  if (
	JSON.parse(protectedFilesJSON).some(
	  (item) =>	item.filename === filename && item.password === password
	)
  ) {
	// лог для відстеження операції
	console.log(`Password for file '${filename}' is correct`);
    // якщо пароль правильний, то читаємо захищений файл та повертаємо його
	const filePath = path.join(dirPath, filename);
	const content = fs.readFileSync(filePath, 'utf8');
    // отримуємо дату завантаження та розширення файлу
	const uploadedDate = fs.statSync(filePath).birthtime;
    const extension = path.extname(filename).slice(1);
      // повертаємо успішну відповідь разом із даними про файл
	  console.log(`Sending protected file: ${filename}`);
	  return res.status(200).send({
		message: 'Success',
		filename: filename,
		content: content,
		extension: extension,
		uploadedDate: uploadedDate,
	  });
  } else {
	// лог для відстеження операції
	console.log(`Password for file '${filename}' is incorrect`);
      // якщо пароль невірний, повертаємо помилку з відповідним повідомленням
	  return res.status(400).send({
		message: 'This is protected file, write correct password',
	  });
  }
}
module.exports = {
	addToProtectedFiles,
	checkPassword,
};
