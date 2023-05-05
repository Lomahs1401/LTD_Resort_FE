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
import RoomTypeDetail from './pages/RoomTypeDetail/RoomTypeDetail';
import Comment from './components/Comment/Comment';
import RequireAuth from './utils/RequireAuth';
import ManageAccount from './pages/ManageAccount/ManageAccount';
import NotFound from './pages/Error/NotFound/NotFound';
import Unauthorized from './pages/Error/Unauthorized/Unauthorized';
import ScrollToTop from './utils/ScrollToTop';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <div className="App">
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
          <Route path='/admin/*' element={<Admin />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/find-rooms" element={<FindRoom />} />
            <Route path="/find-rooms/:roomTypeId" element={<RoomTypeDetail />} />
            <Route path="/manage-account" element={<ManageAccount />} />
            <Route path="/find-services" element={<FindService />} />
            <Route path='/favourites' element={<Favourites />} />
          </Route>

          {/* Unauthorized Page */}
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Not found routes */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
