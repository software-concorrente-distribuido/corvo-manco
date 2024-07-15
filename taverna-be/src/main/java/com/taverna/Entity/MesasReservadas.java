package com.taverna.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "MesasReservadas")
@Entity(name = "MesasReservadas")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MesasReservadas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "mesas_id", nullable = false)
    public Mesas mesa;

    @OneToOne(mappedBy = "mesasReservadas")
    private Reservas reserva;
}
