// helpers.js
const fs = require('fs');
const path = require('path');
// визначення шляху до теки, де зберігаються файли
const dirPath = path.dirname('./files/*');
// перевірка наявності файлу 'protectedFiles' перед читанням
if (!fs.existsSync('protectedFiles.json')) {
    fs.writeFileSync('protectedFiles.json', '[]', 'utf8');
}
try {
  // зчитування даних про захищені файли з файлу 'protectedFiles.json'
  const protectedFilesJSON = fs.readFileSync('protectedFiles.json', 'utf8');
} catch (error) {
  console.error('Error reading protectedFiles.json:', error.message);
}
// функція для додавання файлу до списку захищених файлів
function addToProtectedFiles(req) {
	const { filename, password } = req.body;
    // створення об'єкта, що представляє новий файл для захисту
	const file = { file: { filename, password } };
    // читання попередніх даних про захищені файли
	const previousData = JSON.parse(
		fs.readFileSync('protectedFiles.json', 'utf8')
	);
    // додавання нового файлу до списку захищених файлів
	previousData.push(file);
    // запис оновленого списку в файл 'protectedFiles.json'
	fs.writeFile(
		'protectedFiles.json',
		JSON.stringify(previousData),
		'utf8',
		() => {console.log('Added to protected files');}
	);
}
// ф-ція перевірки пароля та повернення вмісту захищеного файлу, якщо пароль правильний
function checkPassword(filename, password, res) {
	if (
		JSON.parse(protectedFilesJSON).some(
			(item) =>
				item.file.filename === filename && item.file.password === password
		)
	) {
        // якщо пароль правильний, то читаємо захищений файл та повертаємо його
		const content = fs
			.readFileSync(`${dirPath}/${filename}`)
			.toString();
        // отримуємо дату завантаження та розширення файлу
		const uploadedDate = fs.statSync(`${dirPath}/${filename}`).birthtime;
		const extension = path.extname(filename).slice(1);
        // повертаємо успішну відповідь разом із даними про файл
		return res.status(200).send({
			message: 'Success',
			filename: filename,
			content: content,
			extension: extension,
			uploadedDate: uploadedDate,
		});
	} else {
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
