CREATE TABLE jogos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imgUrl VARCHAR(255),
    categoria VARCHAR(50) NOT NULL,
    qtdTotal INT NOT NULL,
    PRIMARY KEY (id)
);