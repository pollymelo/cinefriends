import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Buttons.css';

const Buttons = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCadastro = () => {
    navigate('/register');
  };

  return (
    <div className="buttons-container">
      <button type="button" className="home" onClick={handleLogin}>
        Login
      </button>
      <span className="separator">|</span>
      <button type="button" className="home" onClick={handleCadastro}>
        Cadastro
      </button>
    </div>
  );
};

export default Buttons;
