// hooks/useSort.jsx
import { useState } from 'react'

// для управління сортуванням масиву даних
export default function useSort() {
  // стани для порядку сортування та колонки, за якою сортується масив
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('')

  // порівнює два елементи масиву за певною властивістю
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1
      }
      if (b[orderBy] > a[orderBy]) {
        return 1
      }
      return 0
    }

  // повертає функцію порівняння на основі порядку та колонки сортування
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  // сортує масив, забезпечуючи стабільність сортування
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  // визначає напрямок сортування та колонку для сортування
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // об'єкт з функціями та станами, необхідними для сортування
  return {
    getComparator,
    stableSort,
    handleRequestSort,
    order,
    setOrder,
    orderBy,
    setOrderBy
  }
}