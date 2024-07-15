package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Mesas;
import com.corvomanco.tavernateste.entities.MesasReservadas;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MesasRepository extends JpaRepository<Mesas, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Mesas m WHERE m.Id = :id")
    Optional<MesasReservadas> findByIdWithPessimisticLock(Long id);
}
