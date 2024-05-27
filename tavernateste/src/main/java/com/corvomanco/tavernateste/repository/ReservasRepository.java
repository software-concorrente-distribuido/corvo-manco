package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservasRepository extends JpaRepository<Reservas, Long> {
}
