// hooks/usePrivateAxios.jsx
import axios from '../api/axios' // базовий Axios інстанс
import useAuth from './useAuth' // хук для отримання даних про автентифікацію

export default function usePrivateAxios() {
  // щоб отримати токен автентифікації
    const { auth } = useAuth()
  // встановлюємо заголовок "Authorization" для всіх запитів Axios
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + auth
  }
  // повертаємо інстанс, який містить автентифікацію
  return axios
}