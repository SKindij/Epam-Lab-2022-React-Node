/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
// hooks/useTrucks.jsx
import { useEffect, useState } from 'react'
import usePrivateAxios from './usePrivateAxios'

// URL для запитів на отримання даних про вантажівки
const LOADS_URL = '/api/trucks/'

export default function useTrucks() {
    const [trucks, setTrucks] = useState([])
  // інстанс Axios з налаштуваннями автентифікації
    const axios = usePrivateAxios()

  // запит до сервера для отримання списку вантажівок
  async function fetchTrucks() {
    try {
      const response = await axios.get(LOADS_URL)
      setTrucks(response?.data?.trucks)
    } catch (error) {}
  }
  
  // автоматично виконується один раз при завантаженні компоненту
  useEffect(() => {
    fetchTrucks()
  }, [])

  // об'єкт зі списком вантажівок та функціями їх оновлення та завантаження
  return { trucks, setTrucks, fetchTrucks }
}