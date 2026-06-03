CREATE DATABASE banco_filmes;
USE banco_filmes;

CREATE TABLE filmes (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    nota FLOAT NOT NULL
);

USE banco_filmes;
SELECT * FROM filmes;