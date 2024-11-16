import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Register from './pages/auth/Register'
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserLayout from './layouts/UserLayout';
import UserDashboardPage from './pages/user/UserDashboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AdminLayout />} >
          <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path='/user/dashboard' element={<UserDashboardPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App