CREATE TABLE mesas_reservadas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    id_reserva BIGINT NOT NULL,
    id_mesa BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_reserva) REFERENCES reservas(id),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id)
);