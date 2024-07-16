package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "Reservas")
@Entity(name = "Reservas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;
    private LocalDate inicio;
    private LocalDate fim;
}
