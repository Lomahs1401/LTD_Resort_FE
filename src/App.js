import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Facilities from './pages/Facilities/Facilities';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          {/* <Route path="/rooms" element={<Room />} />
          <Route path="/contact_us" element={<Facilities />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
