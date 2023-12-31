// generateId.js
export const generateId = () => {
/*
  Цей рядок визначає початкове число для генерації ID, що сформоване з додавання кількох чисел
  із використанням експоненційної форми запису. Використовується метод .replace 
  для обробки кожної цифри (0, 1 або 8) у вищезгаданому числі.
  Кожна з цих цифр буде замінена на інше значення, визначене функцією, яка передається як аргумент.
*/
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};
/*
Частина коду функції використовує Web Crypto API для отримання випадкових значень. 
В даному випадку, вона генерує один випадковий байт (8 бітів) даних.
Оператор ^ виконує побітове виключне "або" між значенням c і результатом виразу в круглих дужках.
Остаточно, результат перетворюється в рядок, створюючи одну шістнадцяткову цифру.
*/
