package com.taverna.Entity;

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

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    public Usuario usuario;
    public LocalTime horarioInicio;
    public LocalTime horarioFim;

    @Column(name = "horario")
    private LocalTime horario;

    @ManyToOne
    @JoinColumn(name = "mesa_id")
    private Mesas mesa;

    @OneToOne
    @JoinColumn(name = "mesasreservadas_id")
    public MesasReservadas mesasReservadas;
}
