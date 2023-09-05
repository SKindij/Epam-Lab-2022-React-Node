import { FC } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import './App.css'

// щоб вказати, що це функціональний компонент
const App:FC = () => {
  return (
    <>
      <h1>Vite + React + TypeScript</h1>
      <Header />
	  <Courses />
    </>
  );
};

export default App
