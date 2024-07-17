package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Jogos;

import jakarta.persistence.LockModeType;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface JogosRepository extends JpaRepository<Jogos, Long> {
   @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT m FROM Jogos m WHERE m.id = :id")
    Optional<Jogos> findByIdWithPessimisticLock(@Param("id") Long id);

}
