import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './sass/style.css';
import Button from './components/Button/Button';
import {  } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className='header'>
          <div className='header-inner'>
            <div className='header-inner-text'>
              HELLO GUYS
            </div>
            <p style={{ fontSize: 40 }}>Hello</p>
          </div>
          <div className='box'></div>
        </div>
        <div style={{ padding: '10px 32px' }}>
          <Button />
          <Button primary />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
