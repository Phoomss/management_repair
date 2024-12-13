import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Register from './pages/auth/Register'
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserLayout from './layouts/UserLayout';
import UserDashboardPage from './pages/user/UserDashboardPage';
import AdminDetailPage from './pages/admin/AdminDetailPage';
import AdminStepTespPage from './pages/admin/AdminStepTespPage';
import AdminUserPage from './pages/admin/AdminUserPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import UserDetailPage from './pages/user/UserDetailPage';
import UserStepTestPage from './pages/user/UserStepTestPage';
import UserProfilePage from './pages/user/UserProfilePage';
import AdminCreateUserPage from './pages/admin/Form/AdminCreateUserPage';
import AdminEditUserPage from './pages/admin/Form/AdminEditUserPage';
import AdminPipePage from './pages/admin/AdminPipePage';
import AdminCreateCasePage from './pages/admin/Form/AdminCreateCasePage';
import AdminCaseDetail from './pages/admin/AdminCaseDetail';
import AdminEditCasePage from './pages/admin/Form/AdminEditCasePage';
import UserCreateCasePage from './pages/user/Form/UserCreateCasePage';
import UserEditCasePage from './pages/user/Form/UserEditCasePage';
import UserCaseDetailPage from './pages/user/UserCaseDetail';
import AdminCreateStepTestPage from './pages/admin/Form/AdminCreateStepTestPage';
import UserCreateStepTestPage from './pages/user/Form/UserCreateStepTestPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AdminLayout />} >
          <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
          <Route path='/admin/case' element={<AdminDetailPage />} />
          <Route path='/admin/case/detail/:id' element={<AdminCaseDetail />} />
          <Route path='/admin/case/create' element={<AdminCreateCasePage />} />
          <Route path='/admin/case/edit/:id' element={<AdminEditCasePage />} />
          <Route path='/admin/step-test' element={<AdminStepTespPage />} />
          <Route path='/admin/step-test/create' element={<AdminCreateStepTestPage />} />
          <Route path='/admin/pipe' element={<AdminPipePage />} />
          <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
          <Route path='/admin/user' element={<AdminUserPage />} />
          <Route path='/admin/user/edit/:id' element={<AdminEditUserPage />} />
          <Route path='/admin/profile' element={<AdminProfilePage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path='/user/dashboard' element={<UserDashboardPage />} />
          <Route path='/user/case' element={<UserDetailPage />} />
          <Route path='/user/case/detail/:id' element={<UserCaseDetailPage />} />
          <Route path='/user/case/create' element={<UserCreateCasePage />} />
          <Route path='/user/case/edit/:id' element={<UserEditCasePage />} />
          <Route path='/user/step-test' element={<UserStepTestPage />} />
          <Route path='/user/step-test/create' element={<UserCreateStepTestPage />} />
          <Route path='/user/profile' element={<UserProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App