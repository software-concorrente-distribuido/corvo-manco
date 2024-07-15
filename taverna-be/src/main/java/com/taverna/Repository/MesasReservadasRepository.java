package com.taverna.Repository;

import com.taverna.Entity.MesasReservadas;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MesasReservadasRepository extends JpaRepository<MesasReservadas, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Mesas m WHERE m.Id = :id")
    Optional<MesasReservadas> findByIdWithPessimisticLock(Long id);
}
