/* eslint-disable react/prop-types */
// Snack.jsx
import { Alert, Snackbar } from '@mui/material'

// відповідає за відображення сповіщень у вигляді "снекбарів"
export default function Snack({
  isOpen, handleClose = Function.prototype
}) {
  return (
    // відображення сповіщення у вигляді висуваного панелю
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={7500}
    >
      <Alert severity='success'>Success</Alert>
    </Snackbar>
  )
}