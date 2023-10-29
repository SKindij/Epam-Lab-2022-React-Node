// hooks/useAuth.jsx
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

// хук дозволяє компонентам отримувати доступ до стану та функцій, пов'язаних із автентифікацією
export default function useAuth() {
  // для отримання значення контексту `AuthContext`
  return useContext(AuthContext)
}
/*
  Цей хук корисний для компонентів, які потребують доступу до стану автентифікації, 
  таких як інформація про авторизованого користувача, статус входу в систему тощо. 
*/