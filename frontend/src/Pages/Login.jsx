/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5173/api/users/login',
        formData,
      );
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/profile');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <div className="login-header">CineFriends</div>
      <div className="login-main">
        <form className="login-box">
          <h2>Login</h2>
          <label htmlFor="usuario">Usuário:</label>
          <input id="usuario" type="text" placeholder="Digite o usuário..." />
          <label htmlFor="senha">Senha:</label>
          <input id="senha" type="password" placeholder="Digite a senha..." />
          <button
            type="submit"
            className="profile"
            onClick={() => navigate('/profile')}
          >
            Acessar
          </button>
          <div className="login-links">
            <a href="#">Esqueceu a senha?</a>
            <a
              href="#"
              className="register"
              onClick={() => navigate('/Register')}
            >
              Fazer Cadastro
            </a>
          </div>
        </form>
      </div>
      <div className="login-footer">Direitos Reservados © Copyright</div>
    </>
  );
}

export default Login;
