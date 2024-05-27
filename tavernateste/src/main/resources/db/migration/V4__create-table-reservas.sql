CREATE TABLE reservas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    horarioInicio DATE NOT NULL,
    horarioFim DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);