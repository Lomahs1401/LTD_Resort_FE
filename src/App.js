import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Facilities from './pages/Facilities/Facilities';
import Room from './pages/Room/Room';
import FindRoom from './pages/FindRoom/FindRoom';
import FindService from './pages/FindService/FindService';
import Favourites from './pages/Favourites/Favourites';
import RoomTypeDetail from './pages/RoomTypeDetail/RoomTypeDetail';
import Comment from './components/Comment/Comment';
import ManageAccount from './pages/ManageAccount/ManageAccount';
import NotFound from './pages/Error/NotFound/NotFound';
import Unauthorized from './pages/Error/Unauthorized/Unauthorized';
import ScrollToTop from './utils/ScrollToTop';
import Admin from './pages/Admin/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App;
