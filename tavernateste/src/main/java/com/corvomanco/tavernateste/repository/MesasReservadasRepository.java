package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.MesasReservadas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MesasReservadasRepository extends JpaRepository<MesasReservadas, Long> {
    List<MesasReservadas> findByReservaId(Long reservaId);
}
