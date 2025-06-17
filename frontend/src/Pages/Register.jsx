import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import cinemaImg from '../assets/cinema_svg.png';

// eslint-disable-next-line no-unused-vars
const generos = ['', 'Masculino', 'Feminino', 'Não Binário'];

function Register({ setUsuario }) {
  const [form, setForm] = useState({
    nome: '',
    genero: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    usuario: '',
    senha: '',
    confirmaSenha: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.senha !== form.confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const payload = {
        nome: form.nome,
        genero: form.genero,
        data_nascimento: form.data_nascimento.split('/').reverse().join('-'),
        email: form.email,
        telefone: form.telefone.replace(/\D/g, ''),
        usuario: form.usuario,
        senha: form.senha,
      };
      const response = await axios.post(
        'http://localhost:3001/api/usuarios',
        payload,
      );
      setUsuario(response.data);
      localStorage.setItem('usuario', JSON.stringify(response.data));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar.');
    }
  };

  return (
    <div className="register-bg">
      <div className="register-main">
        {/* Lado esquerdo */}
        <div className="register-left">
          <div className="register-logo">CineFriends</div>
          <div className="register-slogan">
            Encontre sua próxima companhia de cinema.
          </div>
          <div className="register-img-circle">
            <img src={cinemaImg} alt="Cinema" />
          </div>
        </div>
        {/* Lado direito */}
        <form className="register-card" onSubmit={handleSubmit}>
          <div className="register-title">Cadastro</div>
          <div className="register-fields">
            <label>
              Nome completo:
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome..."
                value={form.nome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Gênero:
              <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
              >
                <option value="">Selecione seu gênero...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não Binário">Não Binário</option>
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
                name="email"
                placeholder="Digite seu e-mail..."
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Telefone:
              <input
                type="tel"
                name="telefone"
                placeholder="(xx) xxxxx-xxxx"
                value={form.telefone}
                onChange={handleChange}
                pattern="\(\d{2}\) \d{5}-\d{4}"
                required
              />
            </label>
            <label>
              Usuário:
              <input
                type="text"
                name="usuario"
                placeholder="Digite o usuário..."
                value={form.usuario}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Senha:
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha..."
                value={form.senha}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Confirme a senha:
              <input
                type="password"
                name="confirmaSenha"
                placeholder="Confirme sua senha..."
                value={form.confirmaSenha}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          {error && <div className="register-error">{error}</div>}
          <button className="register-btn" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
