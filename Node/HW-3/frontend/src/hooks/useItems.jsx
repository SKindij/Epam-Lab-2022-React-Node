// hooks/useItems.jsx
import { useState } from 'react'
import usePrivateAxios from './usePrivateAxios'

// для отримання та керування елементами певного типу
export default function useItems(type) {
  // ініціалізуємо стан `items` як пустий масив
    const [items, setItems] = useState([])

  // хук для створення екземпляру Axios з авторизацією
  const privateAxios = usePrivateAxios()

  // для отримання елементів типу `type` з сервера
  async function fetchItems() {
    // виконуємо запит до сервера
      const response = await privateAxios.get(`/api/${type}/`)
    // встановлюючи значення на елементи, отримані з сервера
      setItems(response.data[type])
  }

  return { items, setItems, fetchItems }
}