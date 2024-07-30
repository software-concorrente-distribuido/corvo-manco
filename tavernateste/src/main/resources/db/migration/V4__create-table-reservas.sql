CREATE TABLE reservas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    id_usuario INT,
    inicio DATE NOT NULL,
    fim DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);