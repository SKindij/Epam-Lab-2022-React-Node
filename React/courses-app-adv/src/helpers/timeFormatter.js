// timeFormatter.js
export const timeFormatter = (input) => {
  // функція видаляє всі символи, які не є цифрами
	return input.replace(/\D/g, '');
};
