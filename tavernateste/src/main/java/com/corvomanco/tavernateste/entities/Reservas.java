package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Table(name = "Reservas")
@Entity(name = "Reservas")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    //@OneToOne(mappedBy = "reserva")
    public Usuario usuario;
    public LocalTime horarioInicio;
    public LocalTime horarioFim;

    @OneToOne
    @JoinColumn(name = "mesasreservadas_id")
    public MesasReservadas mesasReservadas;

    @Enumerated(EnumType.STRING)
    public StatusReserva status;

    public enum StatusReserva
    {
        PENDENTE,
        CONFIRMADA,
        CANCELADA
    }
}