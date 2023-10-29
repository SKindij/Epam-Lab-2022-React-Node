// AuthProvider.jsx
import { createContext, useEffect, useState } from 'react'

// служить для передачі даних та функцій між компонентами в різних частинах дерева
const AuthContext = createContext({})

export function AuthProvider({ children }) {
  // значення токену автентифікації та ролей, що отримуються з локального сховища
  const [auth, setAuth] = useState(sessionStorage.getItem('jwt_token'))
  const [role, setRole] = useState(sessionStorage.getItem('role'))

  // хук, щоб реагувати на зміни ролі користувача
  useEffect(() => {
    setRole(sessionStorage.getItem('role'))
  }, [role])

  // Provider передає значення усім дочірнім компонентам через контекст
  return (
    <AuthContext.Provider value={{ auth, setAuth, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

/*
 будь-який компонент, який підписаний на цей контекст, 
 може отримати доступ до даних про автентифікацію та ролі користувача
*/
export default AuthContext
