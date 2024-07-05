package com.taverna.Repository;

import com.taverna.Entity.Mesas;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MesasRepository extends JpaRepository<Mesas, Long> {

}
