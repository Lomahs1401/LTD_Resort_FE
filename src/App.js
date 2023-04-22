import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Facilities from './pages/Facilities/Facilities';
import Room from './pages/Room/Room';
import AccountInfo from './pages/Account_home/Account_home';
import CustomerInfo from './components/Account_info_/Customer_info/Customer_info';
import AuthUser from './AuthUser';

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Login />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/account_info" element={<AccountInfo />} />
          <Route path="/customer-info" element={<CustomerInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
