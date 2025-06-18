import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import cinemaImg from '../assets/cinema_svg.png';

const genero = ['Masculino', 'Feminino', 'Não Binário'];

function Register({ setUsuario }) {
  const [form, setForm] = useState({
    nome: '',
    usuario: '',
    genero: '',
    data_nascimento: '',
    email: '',
    telefone: '',
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

    if (!form.nome.trim()) {
      setError('Nome completo é obrigatório.');
      return;
    }

    if (!form.usuario.trim()) {
      setError('Nome de usuário é obrigatório.');
      return;
    }

    if (form.senha !== form.confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    const telefoneNumeros = form.telefone.replace(/\D/g, '');

    if (telefoneNumeros.length < 10) {
      setError('Telefone inválido. Digite pelo menos 10 dígitos.');
      return;
    }

    const payload = {
      nome: form.nome,
      usuario: form.usuario,
      email: form.email,
      senha: form.senha,
      telefone: telefoneNumeros,
      genero: form.genero,
      data_nascimento: form.data_nascimento,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        payload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      setUsuario(response.data);
      localStorage.setItem('usuario', JSON.stringify(response.data));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.');
    }
  };

  return (
    <div className="register-bg">
      <div className="register-main">
        <div className="register-left">
          <div className="register-logo">CineFriends</div>
          <div className="register-slogan">
            Encontre sua próxima companhia de cinema.
          </div>
          <div className="register-img-circle">
            <img src={cinemaImg} alt="Cinema" />
          </div>
        </div>
        <form className="register-card" onSubmit={handleSubmit}>
          <div className="register-title">Cadastro</div>
          <div className="register-fields">
            <label>
              Nome completo:
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome completo..."
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
                {genero.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data de Nascimento:
              <input
                type="date"
                className="date"
                name="data_nascimento"
                value={form.data_nascimento}
                onChange={handleChange}
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
              Nome de usuário:
              <input
                type="text"
                name="usuario"
                placeholder="Digite seu nome de usuário..."
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
