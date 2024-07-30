package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "MesasReservadas")
@Entity(name = "MesasReservadas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesasReservadas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_reserva", referencedColumnName = "id")
    private Reservas reserva;

    @ManyToOne
    @JoinColumn(name = "id_mesa", referencedColumnName = "id")
    private Mesas mesa;
}
