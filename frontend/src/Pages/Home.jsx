import React from 'react';
import Buttons from '../Components/Buttons';
import './Home.css';
import theaterImage from '../assets/theater3.jpg';
import CopyR from '../Components/CopyR';

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
      <CopyR className="copyr" />
    </>
  );
};

export default Home;
