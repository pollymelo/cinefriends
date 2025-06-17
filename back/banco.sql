CREATE DATABASE cinefriends;

use cinefriends;

CREATE TABLE usuario (
	id int auto_increment primary key,
    nome varchar (255) not null,
    genero enum ('Masculino', 'Feminino', 'Não Binário'),
    data_nascimento date not null,
    email varchar (255) not null unique,
    telefone varchar(11) not null,
    usuario varchar(25) not null,
    senha varchar(255) not null
)