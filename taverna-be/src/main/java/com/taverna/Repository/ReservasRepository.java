package com.taverna.Repository;

import com.taverna.Entity.MesasReservadas;
import com.taverna.Entity.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;

public interface ReservasRepository extends JpaRepository<Reservas, Long> {
    List<Reservas> findReservasByMesaAndHorarioBetween(MesasReservadas mesasReservadas, LocalTime horarioFim, LocalTime horarioInicio);
}
