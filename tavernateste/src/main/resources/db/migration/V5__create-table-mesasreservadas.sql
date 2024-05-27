CREATE TABLE mesasreservadas (
    id_reserva BIGINT NOT NULL,
    id_mesa BIGINT NOT NULL,
    PRIMARY KEY (id_reserva, id_mesa),
    FOREIGN KEY (id_reserva) REFERENCES reservas(id),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id)
);