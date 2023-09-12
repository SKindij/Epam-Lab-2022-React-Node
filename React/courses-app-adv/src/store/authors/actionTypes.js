// actionTypes.js
/*
Цей файл  містить константи, які використовуються для визначення типів дій (actions) в Redux. 
Кожен тип дії відповідає певній операції, яку слід виконати у редукторах при обробці цієї дії. 
*/
export const ADD_INITIAL_AUTHORS = 'ADD_INITIAL_AUTHORS';
export const GET_INITIAL_AUTHORS = 'GET_INITIAL_AUTHORS';
export const ADD_ONE_POOL_AUTHOR = 'ADD_ONE_POOL_AUTHOR';
export const UPDATE_POOL_AUTHORS = 'UPDATE_POOL_AUTHORS';
export const GET_POOL_AUTHORS = 'GET_POOL_AUTHORS';
export const ADD_ALL_AUTHORS = 'ADD_ALL_AUTHORS';
export const UPDATE_ALL_AUTHORS = 'UPDATE_ALL_AUTHORS';
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS';
export const ADD_POOL_AUTHORS_ARRAY = 'ADD_POOL_AUTHORS_ARRAY';
/*
Ці константи використовуються в файлі actionCreators.js для створення об'єктів дій, 
і вони також використовуються у редукторах для визначення, які операції виконувати при обробці кожної дії.
*/
