package com.corvomanco.tavernateste.repository;

import com.corvomanco.tavernateste.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
