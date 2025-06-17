import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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
};

export default Login;
