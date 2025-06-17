import React, { useState } from 'react';
import './Atualiza.css';
import { useNavigate } from 'react-router-dom';

const Atualiza = () => {
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirma, setErroConfirma] = useState('');

  const navigate = useNavigate();

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
      // Aqui você pode enviar os dados para a API
      alert('Dados atualizados com sucesso!');
    }
  };

  return (
    <div className="atualiza-bg">
      <div className="atualiza-header">CineFriends</div>
      <div className="atualiza-container">
        <form className="atualiza-form" onSubmit={handleSubmit}>
          <h2>Atualizar Dados</h2>
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
            Digite a senha:
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
          <button type="submit" onClick={() => navigate('/Profile')}>
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Atualiza;
