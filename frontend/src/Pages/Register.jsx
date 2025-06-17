import React, { useState } from 'react';
import './Register.css';
import cinemaImg from '../assets/cinema_svg.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirma, setErroConfirma] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (senha.length < 6) {
      setErroSenha('A senha deve ter pelo menos 6 caracteres.');
      valid = false;
    } else {
      setErroSenha('');
    }

    if (senha !== confirmaSenha) {
      setErroConfirma('As senhas não coincidem.');
      valid = false;
    } else {
      setErroConfirma('');
    }

    if (valid) {
      alert('Cadastro realizado com sucesso!');
    }
  };
  return (
    <div className="register-bg">
      <div className="register-container">
        {/* Coluna Esquerda */}
        <div className="register-left">
          <div className="register-title-box">
            <h1>Cadastro</h1>
          </div>
          <div className="register-logo">
            <span className="logo-main">CineFriends</span>
            <span className="logo-slogan">
              Encontre sua próxima companhia de cinema.
            </span>
          </div>
          <img
            src={cinemaImg}
            alt="Cinema"
            className="\assets\cinema_svg.png"
          />
        </div>
        {/* Coluna Direita */}
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nome completo:
            <input type="text" placeholder="Digite seu nome..." required />
          </label>
          <label>
            Gênero:
            <select
              id="genero"
              value={genero} // <--- Vincule o valor do select ao estado 'genero'
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="selecionar">Selecione seu gênero</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nbinario">Não Binário</option>
            </select>
          </label>
          <label>
            Data de Nascimento:
            <input
              type="date"
              className="date"
              placeholder="dd/mm/aaaa"
              required
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              placeholder="(xx) xxxxx-xxxx"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </label>
          <label>
            Usuário:
            <input type="text" placeholder="Digite o usuário..." required />
          </label>
          <label>
            Senha:
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erroSenha && <span className="erro">{erroSenha}</span>}
          </label>
          <label>
            Confirme a senha:
            <input
              type="password"
              placeholder="Confirme sua senha..."
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
            />
            {erroConfirma && <span className="erro">{erroConfirma}</span>}
          </label>
          <button type="submit" onClick={() => navigate('/login')}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
