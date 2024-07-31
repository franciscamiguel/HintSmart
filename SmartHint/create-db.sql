CREATE DATABASE smarthint;

USE smarthint;

CREATE TABLE tipo_pessoa (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL
);

CREATE TABLE genero (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL
);

CREATE TABLE cliente (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome_razao VARCHAR(150) NOT NULL,
	email VARCHAR(150) NOT NULL,
	senha VARCHAR(15) NOT NULL,
	telefone VARCHAR(11) NOT NULL,
	data_cadastro DATETIME NOT NULL DEFAULT now(),
	tipo INT NOT NULL,
	cpf_cnpj VARCHAR(14) NOT NULL,
	inscricao_estadual VARCHAR(12) NULL,
	genero INT NULL,
	data_nascimento DATETIME NULL,
	bloqueado BIT NOT NULL DEFAULT 1,

	FOREIGN KEY (tipo) REFERENCES tipo_pessoa (id),
	FOREIGN KEY (genero) REFERENCES genero (id)
);
