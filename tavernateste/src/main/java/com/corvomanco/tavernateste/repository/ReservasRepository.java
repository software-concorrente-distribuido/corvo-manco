package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;


import com.corvomanco.tavernateste.entities.MesasReservadas;
import com.corvomanco.tavernateste.entities.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;

public interface ReservasRepository extends JpaRepository<Reservas, Long> {

    @Query("SELECT r FROM Reservas r WHERE r.mesasReservadas = :mesaReservada AND r.status = 'CONFIRMADA' AND " +
            "(r.horarioInicio < :horarioFim AND r.horarioFim > :horarioInicio)")
    List<Reservas> findReservasByHorario(@Param("mesaReservada") MesasReservadas mesaReservada,
                                         @Param("horarioFim") LocalTime horarioFim,
                                         @Param("horarioInicio") LocalTime horarioInicio);
}