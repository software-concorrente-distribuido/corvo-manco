package com.corvomanco.tavernateste.controllers;

import com.corvomanco.tavernateste.repository.JogosRepository;
import com.corvomanco.tavernateste.entities.Jogos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.corvomanco.tavernateste.entities.Reservas;
import com.corvomanco.tavernateste.repository.ReservasRepository;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class JogosController {

    private final JogosRepository jogosRepository;
    private final ReservasRepository reservasRepository;

    public JogosController(JogosRepository jogosRepository, ReservasRepository reservasRepository) {
        this.jogosRepository = jogosRepository;
        this.reservasRepository = reservasRepository;
    }

    @GetMapping("/jogos")
    public List<Jogos> findAll() {
        return jogosRepository.findAll();
    }

    @GetMapping("/jogos/{id}")
    public ResponseEntity<Jogos> findById(@PathVariable Long id) {
        return jogosRepository.findById(id)
                .map(jogo -> ResponseEntity.ok().body(jogo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/jogos")
    public ResponseEntity<String> createJogo(@RequestBody Jogos jogo) {
        if (jogo == null || jogo.getReserva() == null) {
            return ResponseEntity.badRequest().body("Detalhes do jogo inválidos.");
        }

        Optional<Reservas> reservaOpt = reservasRepository.findById(jogo.getReserva().getId());
        if (reservaOpt.isPresent()) {
            Reservas reserva = reservaOpt.get();
            if (reserva.getStatus() == Reservas.StatusReserva.CONFIRMADA) {
                jogo.setStatus(Jogos.StatusJogo.PENDENTE);
                jogosRepository.save(jogo);
                return ResponseEntity.status(HttpStatus.CREATED).body("Jogo reservado pendente. Confirme dentro de 5 minutos.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("A reserva da mesa não está confirmada.");
            }
        } else {
            return ResponseEntity.badRequest().body("Reserva não encontrada.");
        }
    }

    @PostMapping("/jogos/confirmar/{id}")
    public ResponseEntity<String> confirmarJogo(@PathVariable Long id) {
        Optional<Jogos> jogoOpt = jogosRepository.findById(id);
        if (jogoOpt.isPresent()) {
            Jogos jogo = jogoOpt.get();
            if (jogo.getStatus() == Jogos.StatusJogo.PENDENTE) {
                jogo.setStatus(Jogos.StatusJogo.CONFIRMADO);
                jogosRepository.save(jogo);
                return ResponseEntity.ok("Jogo confirmado com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Jogo não pode ser confirmado.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}