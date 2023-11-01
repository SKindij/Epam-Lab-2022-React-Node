// App.jsx
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './pages/Layout'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Reset from './pages/Reset'
import DashboardShipper from './pages/DashboardShipper'
import DashboardDriver from './pages/DashboardDriver'

import RequireAuth from './components/RequireAuth'
import useAuth from './hooks/useAuth'


export default function App() {
  const { role } = useAuth()

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          {/* "сторінки авторизації/аутентифікації" */}
          <Route path='register' element={<Registration />} />
          <Route path='login' element={<Login />} />
          <Route path='reset' element={<Reset />} />

        {/* "визначення контенту по ролі" */}
        <Route element={<RequireAuth allowedRoles={['DRIVER', 'SHIPPER']} />}>
            <Route index element={
              <Navigate to={
                role === 'SHIPPER' ? 'dashboard/shipper' : 'dashboard/driver'
              } replace />
            }/>
          
            <Route path='profile' element={<Profile />} />

            <Route path='*' element={
              <Navigate to={
                  role === 'SHIPPER' ? 'dashboard/shipper' : 'dashboard/driver'
                } replace />
            }/>		  
        </Route>

        {/* "контент для вантажовідправника" */}
        <Route element={<RequireAuth allowedRoles={['SHIPPER']} />}>
            <Route path='dashboard/shipper' element={<DashboardShipper />} />
        </Route>

        {/* "контент для перевізника" */}
        <Route element={<RequireAuth allowedRoles={['DRIVER']} />}>
            <Route path='dashboard/driver' element={<DashboardDriver />} />
        </Route>
        
      </Route>
    </Routes>
  )
}
