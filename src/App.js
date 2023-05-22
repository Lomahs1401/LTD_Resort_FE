import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScrollToTop = lazy(() => import('./utils/ScrollToTop'))
const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'))
const Facilities = lazy(() => import('./pages/Facilities/Facilities'))
const Room = lazy(() => import('./pages/Room/Room'))
const FindRoom = lazy(() => import('./pages/FindRoom/FindRoom'))
const RoomTypeDetail = lazy(() => import('./pages/RoomTypeDetail/RoomTypeDetail'))
const Comment = lazy(() => import('./pages/Admin/Admin'))
const Loading = lazy(() => import('./components/Loading/Loading'))
const FindService = lazy(() => import('./pages/FindService/FindService'))
const Favourites = lazy(() => import('./pages/Favourites/Favourites'))
const ManageAccount = lazy(() => import('./pages/ManageAccount/ManageAccount'))
const Admin = lazy(() => import('./pages/RoomTypeDetail/RoomTypeDetail'))
const NotFound = lazy(() => import('./pages/Error/NotFound/NotFound'))
const Unauthorized = lazy(() => import('./pages/Error/Unauthorized/Unauthorized'))

function App() {

  const ROLE_CUSTOMER = "ROLE_CUSTOMER";
  const ROLE_EMPLOYEE = "ROLE_EMPLOYEE";
  const ROLE_ADMIN = "ROLE_ADMIN";

  const CustomerRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem('role').replace(/"/g, '');

    if (roleUser === ROLE_CUSTOMER) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  }

  const EmployeeRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem('role').replace(/"/g, '');

    if (roleUser === ROLE_EMPLOYEE) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  }

  const AdminRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem('role').replace(/"/g, '');

    if (roleUser === ROLE_ADMIN) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  }

  const AuthRoute = ({ element }) => {
    const token = sessionStorage.getItem('access_token');

    if (token !== null) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
        <ScrollToTop />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<Room />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/comment' element={<Comment />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* customer routes */}
          <Route path="/find-rooms" element={
            <CustomerRoute
              element={
                <FindRoom />
              } />
          } />
          <Route path="/find-rooms/:roomTypeId" element={
            <CustomerRoute
              element={
                <RoomTypeDetail />
              } />
          } />
          <Route path="/manage-account" element={
            <CustomerRoute
              element={
                <ManageAccount />
              } />
          } />
          <Route path="/find-services" element={
            <CustomerRoute
              element={
                <FindService />
              } />
          } />
          <Route path="/favourites" element={
            <CustomerRoute
              element={
                <Favourites />
              } />
          } />

          {/* admin routes */}
          <Route path="/admin/*" element={
            <AdminRoute
              element={
                <Admin />
              } />
          } />

          {/* Unauthorized Page */}
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Not found routes */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App;
