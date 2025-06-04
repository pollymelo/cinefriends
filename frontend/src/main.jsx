import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Atualiza from './Pages/Atualiza';
import Register from './Pages/Register';

import App from './App';
import './index.css';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/atualiza" element={<Atualiza />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>,
);
