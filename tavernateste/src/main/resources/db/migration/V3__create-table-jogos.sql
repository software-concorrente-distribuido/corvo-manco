CREATE TABLE jogos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    img_url VARCHAR(255),
    categoria VARCHAR(50) NOT NULL,
    qtd_total INT NOT NULL,
    PRIMARY KEY (id)
);