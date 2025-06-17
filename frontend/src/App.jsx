import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
