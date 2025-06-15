import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          className="login-input"
        />
        <button type="submit" className="btn-entrar">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
