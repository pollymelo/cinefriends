import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile({ usuario, setUsuario }) {
  const navigate = useNavigate();

  if (!usuario) return null;

  // Função para deletar conta
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${usuario.id}`);
      setUsuario(null);
      localStorage.removeItem('usuario');
      navigate('/');
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Erro ao deletar conta.');
    }
  };

  // Função para desconectar
  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="profile-bg">
      <div className="profile-container">
        {/* Coluna Esquerda */}
        <div className="profile-left">
          <div className="profile-user">
            <div className="profile-user-icon-placeholder">
              {/* Ícone SVG de usuário */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#fff" />
                <ellipse cx="40" cy="34" rx="16" ry="16" fill="#d9d9d9" />
                <ellipse cx="40" cy="62" rx="24" ry="14" fill="#d9d9d9" />
              </svg>
            </div>
            <div>
              <div className="profile-user-name">Nome da Pessoa</div>
              <div className="profile-user-edit">Editar foto</div>
            </div>
          </div>
          <div className="profile-card">
            <div className="profile-logo">
              <span className="profile-logo-main">CineFriends</span>
              <span className="profile-logo-slogan">
                Encontre sua próxima companhia de cinema.
              </span>
            </div>
            <div className="profile-section-title">
              Amigos <span className="profile-plus">+</span>
            </div>
            <div className="profile-friends"></div>
            <div className="profile-section-title">Chat</div>
            <button className="profile-chat-btn">Abrir chat</button>
            <div className="profile-section-title">
              Filmes adicionados <span className="profile-plus">+</span>
            </div>
          </div>
        </div>
        {/* Coluna Direita */}
        <div className="profile-right">
          <div className="profile-section-title profile-pref-title">
            Preferências <span className="profile-plus">+</span>
          </div>
          <div className="profile-preferences"></div>
          <div className="profile-section-title profile-loc-title">
            Localização:
          </div>
          <div className="profile-location">Fortaleza - Ceará</div>
          <button className="profile-action-btn">Conectar o Letterbox</button>
          <button
            className="profile-action-btn"
            onClick={() => navigate('/Atualiza')}
          >
            Atualizar dados
          </button>
          <button className="profile-action-btn " onClick={handleDelete}>
            Deletar conta
          </button>
          <button className="profile-action-btn" onClick={handleLogout}>
            Desconectar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
