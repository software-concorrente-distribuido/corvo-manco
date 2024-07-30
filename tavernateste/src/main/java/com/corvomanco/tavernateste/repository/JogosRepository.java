package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Jogos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JogosRepository extends JpaRepository<Jogos, Long> {

}
