package com.corvomanco.tavernateste.controllers;

import com.corvomanco.tavernateste.repository.JogosRepository;
import com.corvomanco.tavernateste.entities.Jogos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class JogosController {
    private final JogosRepository jogosRepository;

    public JogosController(JogosRepository userRepository) {
        this.jogosRepository = userRepository;
    }

    @GetMapping("/jogos")
    public List<Jogos> findAll() {
        return jogosRepository.findAll();
    }
    @GetMapping("/jogos/{id}")
    public ResponseEntity<Jogos> findById(@PathVariable Long id){
        return jogosRepository.findById(id)
                .map(games -> ResponseEntity.ok().body(games))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/jogos")
    public Jogos createUser(@RequestBody Jogos jogos){
        return jogosRepository.save(jogos);
    }
}

