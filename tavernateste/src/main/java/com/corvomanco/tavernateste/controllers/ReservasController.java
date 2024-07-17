package com.corvomanco.tavernateste.controllers;

import com.corvomanco.tavernateste.dto.ReservaDTO;
import com.corvomanco.tavernateste.entities.Jogos;
import com.corvomanco.tavernateste.entities.Mesas;
import com.corvomanco.tavernateste.entities.MesasReservadas;
import com.corvomanco.tavernateste.entities.Reservas;
import com.corvomanco.tavernateste.entities.Usuario;
import com.corvomanco.tavernateste.repository.MesasRepository;
import com.corvomanco.tavernateste.repository.MesasReservadasRepository;
import com.corvomanco.tavernateste.repository.ReservasRepository;
import com.corvomanco.tavernateste.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.corvomanco.tavernateste.entities.Jogos;
import com.corvomanco.tavernateste.repository.JogosRepository;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservasController {

    @Autowired
    private ReservasRepository reservasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MesasRepository mesasRepository;

    @Autowired
    private JogosRepository jogosRepository;

    @Autowired
    private MesasReservadasRepository mesasReservadasRepository;

    @GetMapping
    public List<Reservas> findAll() {
        return reservasRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservas> findById(@PathVariable Long id) {
        return reservasRepository.findById(id)
                .map(reserva -> ResponseEntity.ok().body(reserva))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createReserva(@RequestBody ReservaDTO reservaDTO) {
        // Verifica se o usuario existe
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(reservaDTO.getIdUsuario());
        if (!usuarioOptional.isPresent()) {
            // Retorna BadRequest com mensagem de erro se o usuario nao existir
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }

        // Verifica se a mesa existe
        Optional<Mesas> mesaOptional = mesasRepository.findByIdWithPessimisticLock(reservaDTO.getIdMesa());
        if (!mesaOptional.isPresent()) {
            // Retorna BadRequest com mensagem de erro se a mesa nao existir
            return ResponseEntity.badRequest().body("Mesa não encontrada.");
        }

        //Verificar se o jogo existe no body da requisição
        Optional<Jogos> jogoOptional = jogosRepository.findByIdWithPessimisticLock(reservaDTO.getIdJogo());
        if (jogoOptional.isPresent()) {
            Jogos jogo = jogoOptional.get();
            jogo.setQtd_total(jogo.getQtd_total() - 1);
            jogosRepository.save(jogo);
}

        Mesas mesa = mesaOptional.get();
        if (mesa.getQuantidade() > 0) {
            // Decrementa a quantidade de mesas disponíveis
            mesa.setQuantidade(mesa.getQuantidade() - 1);
            mesasRepository.save(mesa);

            // Cria a reserva
            Reservas reserva = Reservas.builder()
                    .usuario(usuarioOptional.get())
                    .inicio(reservaDTO.getInicio())
                    .fim(reservaDTO.getFim())
                    .build();

            Reservas savedReserva = reservasRepository.save(reserva);

            // Associa a mesa à reserva
            MesasReservadas mesasReservadas = MesasReservadas.builder()
                    .reserva(savedReserva)
                    .mesa(mesa)
                    .build();

            mesasReservadasRepository.save(mesasReservadas);

            // Retorna a reserva criada com status 201 (Created)
            return ResponseEntity.status(201).body(savedReserva);
        } else {
            // Retorna BadRequest com mensagem de erro se nao houver mesas disponiveis
            return ResponseEntity.badRequest().body("Não há mesas disponíveis.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (!reservasRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Buscar todas as mesas reservadas associadas à reserva
        List<MesasReservadas> mesasReservadas = mesasReservadasRepository.findByIdWithPessimisticLock(id);

        // Remover associações de mesas reservadas
        for (MesasReservadas mesaReservada : mesasReservadas) {
            mesasReservadasRepository.delete(mesaReservada);

            // Incrementar a quantidade de mesas disponíveis
            Mesas mesa = mesaReservada.getMesa();
            mesa.setQuantidade(mesa.getQuantidade() + 1);
            mesasRepository.save(mesa);
        }

        // Deletar a reserva
        reservasRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
