// main.jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './context/AuthProvider'
import { AvatarProvider } from './context/AvatarProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  // надає можливість виводити сповіщення користувачеві
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={2000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
  >
    {/* для маршрутизації в додатку */}
    <BrowserRouter>
      {/* надає стан та функції для автентифікації користувача */}
      <AuthProvider>
        {/* надає стан та функції для роботи з аватаром користувача */}
        <AvatarProvider>
          {/* визначає маршрути для додатку */}
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AvatarProvider>
      </AuthProvider>
    </BrowserRouter>
  </SnackbarProvider>
)
