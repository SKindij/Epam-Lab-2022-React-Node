// AvatarProvider.jsx
import { createContext, useContext, useState } from 'react'

// контексти для зберігання і оновлення аватарки користувачів
const AvatarContext = createContext()
const AvatarUpdateContext = createContext()

  // хук для отримання значення аватара
  export function useAvatar() {
    return useContext(AvatarContext)
  }
  // хук для отримання функції оновлення 
  export function useAvatarUpdate() {
    return useContext(AvatarUpdateContext)
  }

// компонент відповідає за управління аватаром
export function AvatarProvider({ children }) {
  // стан для збереження аватара та функція його оновлення
  const [avatar, setAvatar] = useState(null)
  function updateAvatar(avatar) {
    if (!avatar) {
      setAvatar(null)
      return
    }
    setAvatar(`http://localhost:8080/static/${avatar}`)
  }
  // значення аватара та функція оновлення доступні всім дочірнім компонентам
  return (
    <AvatarContext.Provider value={avatar}>
      <AvatarUpdateContext.Provider value={updateAvatar}>
        {children}
      </AvatarUpdateContext.Provider>
    </AvatarContext.Provider>
  )
}
