import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Buttons.css';

const Buttons = () => {
  const navigate = useNavigate();

  return (
    <div className="buttons-container">
      <button className="home" onClick={() => navigate('/login')}>Login</button>
      <span className="separator">|</span>
      <button className="home" onClick={() => navigate('/register')}>Cadastro</button>
    </div>
  );
};

export default Buttons;
