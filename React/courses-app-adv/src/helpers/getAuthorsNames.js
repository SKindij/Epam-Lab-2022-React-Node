// getAuthorsNames.js
export default function collectAuthors(resultArr, selection, initialList) {
  // використовуємо метод map для обходу кожного елемента в initialList
	// eslint-disable-next-line array-callback-return
	initialList.map((i) => {
    // перевіряємо, чи включено id елемента в обраній selection
		if (selection.includes(i.id)) {
      // додаємо ім'я автора та пробіл до resultArr
			resultArr.push(i.name + ' ');
		}
	});
	return resultArr.join(', ');
}
