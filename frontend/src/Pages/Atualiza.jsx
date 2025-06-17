import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Atualiza.css';

function Atualiza({ usuario, setUsuario }) {
  const [formData, setFormData] = useState({
    email: '',
    telefone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      setFormData({
        email: usuario.email || '',
        telefone: usuario.telefone || '',
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        `http://localhost:3001/api/usuarios/${usuario.id}`,
        formData,
      );
      setUsuario(response.data);
      setSuccess('Dados atualizados com sucesso!');
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao atualizar dados');
    }
  };

  return (
    <div className="atualiza-container">
      <form onSubmit={handleSubmit} className="atualiza-form">
        <h2>Atualizar Dados</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite seu email..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            placeholder="(xx) xxxxx-xxxx"
            maxLength="11"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Atualizar
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/profile')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Atualiza;
