package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.MesasReservadas;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MesasReservadasRepository extends JpaRepository<MesasReservadas, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT mr FROM MesasReservadas mr WHERE mr.reserva.id = :reservaId")
    List<MesasReservadas> findByIdWithPessimisticLock(@Param("reservaId") Long reservaId);
}
