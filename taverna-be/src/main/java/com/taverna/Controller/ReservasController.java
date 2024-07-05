package com.taverna.Controller;


import com.taverna.Entity.MesasReservadas;
import com.taverna.Entity.Reservas;
import com.taverna.Entity.Usuario;
import com.taverna.Repository.MesasReservadasRepository;
import com.taverna.Repository.ReservasRepository;
import com.taverna.Repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservasController {

    private final ReservasRepository reservasRepository;
    private final UsuarioRepository usuarioRepository;
    private final MesasReservadasRepository mesasReservadasRepository;

    // Injeção das dependências
    public ReservasController(ReservasRepository reservasRepository,
                              UsuarioRepository usuarioRepository,
                              MesasReservadasRepository mesasReservadasRepository) {
        this.reservasRepository = reservasRepository;
        this.usuarioRepository = usuarioRepository;
        this.mesasReservadasRepository = mesasReservadasRepository;
    }

    // Método GET pra retornar todas as reservas na tabela
    @GetMapping
    public List<Reservas> findAll() {
        return reservasRepository.findAll();
    }

    // Método GET pra buscar uma reserva pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Reservas> findById(@PathVariable Long id) {
        return reservasRepository.findById(id)
                .map(reserva -> ResponseEntity.ok().body(reserva))
                .orElse(ResponseEntity.notFound().build());
    }

    // Método POST para criar a reserva na tabela
    // Lógica de verificação da disponibilidade da mesa com o método IsMesaDisponivel
    @PostMapping
    public ResponseEntity<Reservas> createReserva(@RequestBody Reservas reserva) {
        // Verificar se a mesa está disponível no horário solicitado
        Optional<MesasReservadas> mesaReservadaOpt = mesasReservadasRepository.findByIdWithPessimisticLock(reserva.getMesasReservadas().getId());
        if (mesaReservadaOpt.isPresent()) {
            MesasReservadas mesaReservada = mesaReservadaOpt.get();
            // Supondo que temos uma lógica para verificar disponibilidade
            if (isMesaDisponivel(mesaReservada, reserva.getHorarioInicio(), reserva.getHorarioFim())) {
                // Salvar a reserva
                Reservas savedReserva = reservasRepository.save(reserva);
                return ResponseEntity.ok(savedReserva);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Mesa não está disponível
            }
        } else {
            return ResponseEntity.badRequest().body(null); // Mesa não encontrada
        }
    }

    // Método pra verificar se a mesa está disponpivel
    private boolean isMesaDisponivel(MesasReservadas mesaReservada, LocalTime horarioInicio, LocalTime horarioFim) {

        List<Reservas> reservas = reservasRepository.findReservasByMesaAndHorarioBetween(
                mesaReservada, horarioFim, horarioInicio);
        return reservas.isEmpty();

    }
}