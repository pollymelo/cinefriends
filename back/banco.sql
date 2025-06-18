CREATE DATABASE cinefriends;

use cinefriends;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  genero ENUM('Masculino', 'Feminino', 'Não Binário'),
  data_nascimento DATE NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(11) NOT NULL,
  usuario VARCHAR(25) NOT NULL,
  senha VARCHAR(255) NOT NULL
);