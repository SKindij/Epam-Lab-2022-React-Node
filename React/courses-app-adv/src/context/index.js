// index.js
import { createContext } from 'react';
/*
Контексти в React використовуються для передачі даних глибоко у вкладені компоненти 
без потреби передавати пропси через багато рівнів компонентів.
*/
export const isAuthorized = createContext(null);
