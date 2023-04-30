import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Facilities from './pages/Facilities/Facilities';
import Room from './pages/Room/Room';
import FindRoom from './pages/FindRoom/FindRoom';
import FindService from './pages/FindService/FindService';
import Favourites from './pages/Favourites/Favourites';
import RequireAuth from './utils/RequireAuth';
import ManageAccount from './pages/ManageAccount/ManageAccount';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<Room />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/find-rooms" element={<FindRoom />} />
            <Route path="/manage-account" element={<ManageAccount />} />
            <Route path="/find-services" element={<FindService />} />
            <Route path='/favourites' element={<Favourites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
