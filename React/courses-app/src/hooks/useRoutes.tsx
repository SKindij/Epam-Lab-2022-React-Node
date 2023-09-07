// useRoutes.tsx
import React, { lazy, Suspense, FC } from 'react';
import { Route, Routes } from 'react-router-dom';

// Імпорт компонентів
const Courses = lazy(() => import('../components/Courses/Courses'));
const Registration = lazy(() =>
  import('../components/Registration/Registration')
);
const Login = lazy(() => import('../components/Login/Login'));
const CourseInfo = lazy(() => import('../components/CourseInfo/CourseInfo'));
const CreateCourse = lazy(() =>
  import('../components/CreateCourse/CreateCourse')
);

// Оголошення типу пропсів для useRoutes
interface UseRoutesProps {
  isAuthenticated:boolean;
}

const useRoutes:FC<UseRoutesProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<CreateCourse />} />
            <Route path='/courses/:courseId' element={<CourseInfo />} />
            <Route path='*' element={<Courses />} />
          </Routes>
        </Suspense>
      </main>
    );
  }

  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default useRoutes;
