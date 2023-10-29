// pages/Layout.jsx
import { Outlet } from 'react-router-dom'

// загальний шаблон сторінки, який відображає вміст інших сторінок
export default function Layout() {
  return (
    <>
      {/* для вставки дочірніх сторінок, що відповідають за конкретні URL шляхи */}
      <Outlet />
    </>
  )
}
