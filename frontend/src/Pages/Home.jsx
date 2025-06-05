import React from 'react';
import Buttons from '../Components/Buttons';
import './Home.css';
import theaterImage from '../assets/theater3.jpg';

const Imagem = () => {
  return (
    <div>
      <img className="imagem" src={theaterImage} alt="Theater" />
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Buttons />
      <Imagem />
      <div className="rights-container">
        <h2>Direitos Reservados © Copyright</h2>
      </div>
    </>
  );
};

export default Home;
