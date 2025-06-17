import React from 'react';
import './Home.css';
import theaterImage from '../assets/theater3.jpg';
import { useNavigate } from 'react-router-dom';
import CopyR from '../Components/CopyR';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img className="imagem" src={theaterImage} alt="Theater" />
      <div className="buttons-container">
        <button className="home" onClick={() => navigate('/Login')}>
          Login
        </button>
        <span className="separator">|</span>
        <button className="home" onClick={() => navigate('/Register')}>
          Cadastro
        </button>
      </div>
    </div>
  );
};

export default Home;
