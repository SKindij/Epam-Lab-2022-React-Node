// hooks/useSnackbar.jsx
import { useSnackbar as Snackbar } from 'notistack'

// хук дозволяє викликати сповіщення з визначеними параметрами
export default function useSnackbar(errorMessage, type) {
  const { enqueueSnackbar } = Snackbar()
  // функція приймає повідомлення та тип і відображає сповіщення
  const showSnackbar = (errorMessage, type) => {
    enqueueSnackbar(errorMessage, { variant: type })
  }

  return showSnackbar
}
/*
  Цей кастомний хук дозволяє спростити процес відображення сповіщень у додатку. 
  Він приймає текстове повідомлення та тип сповіщення ("success", "error" і т. д.) 
  і використовує notistack для відображення сповіщення з відповідними параметрами. 
  Це дозволяє викликати сповіщення, не повторюючи код в кожному окремому компоненті.
*/
