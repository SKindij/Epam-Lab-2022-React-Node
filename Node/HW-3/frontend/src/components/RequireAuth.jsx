// components/RequireAuth.jsx
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// визначає, чи має користувач доступ до вмісту на основі автентифікації та ролі
export default function RequireAuth({ allowedRoles = [] }) {
  // кастомний хук для отримання інформації
  const { auth, role } = useAuth()
  // якщо користувач автентифікований та має дозволену роль
  return auth && allowedRoles.includes(role) ? (
    // , відображаємо вміст компонента
    <Outlet />
  ) : (
    // інакше перенаправляємо його на сторінку входу
    <Navigate to='/login' replace />
  )
}
