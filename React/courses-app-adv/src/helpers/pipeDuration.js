// pipeDuration.js
// функція отримує час у хвилинах і конвертує його в рядок формату "години:хвилини"
export function getHours(input) {
	if (input > 0) {
    // визначаємо кількість хвилин, що залишилися після вирахування годин
		const minutes = input % 60;
    // визначаємо години, округлені вниз
		const hours = Math.floor(input / 60);
		return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
	}
}
// функція приймає число і додає перед ним нуль, якщо число менше 10
export function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}
