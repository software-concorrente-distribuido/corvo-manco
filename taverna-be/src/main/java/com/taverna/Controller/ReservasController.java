package com.taverna.Controller;

import com.taverna.Entity.Cliente;
import com.taverna.Entity.MesasReservadas;
import com.taverna.Entity.Reservas;
import com.taverna.Repository.ClienteRepository;
import com.taverna.Repository.MesasReservadasRepository;
import com.taverna.Repository.ReservasRepository;
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
    private final ClienteRepository clienteRepository;
    private final MesasReservadasRepository mesasReservadasRepository;
    private final ReservaService reservaService;

    // Injeção das dependências
    public ReservasController(ReservasRepository reservasRepository, ClienteRepository clienteRepository, MesasReservadasRepository mesasReservadasRepository, ReservaService reservaService ) {
        this.reservasRepository = reservasRepository;
        this.clienteRepository = clienteRepository;
        this.mesasReservadasRepository = mesasReservadasRepository;
        this.reservaService = reservaService;
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

    @PostMapping
    public ResponseEntity<String> createReserva(@RequestBody Reservas reserva) {
        if (reserva == null || reserva.getMesasReservadas() == null || reserva.getHorarioInicio() == null || reserva.getHorarioFim() == null) {
            return ResponseEntity.badRequest().body("Detalhes da reserva inválidos.");
        }

        Optional<MesasReservadas> mesaReservadaOpt = mesasReservadasRepository.findById(reserva.getMesasReservadas().getId());
        if (mesaReservadaOpt.isPresent()) {
            MesasReservadas mesaReservada = mesaReservadaOpt.get();
            if (isMesaDisponivel(mesaReservada, reserva.getHorarioInicio(), reserva.getHorarioFim())) {
                reserva.setStatus(Reservas.StatusReserva.PENDENTE);
                reservasRepository.save(reserva);
                reservaService.scheduleReservaCancellation(reserva);
                return ResponseEntity.status(HttpStatus.CREATED).body("Reserva pendente. Confirme dentro de 5 minutos.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Mesa não está disponível no horário solicitado.");
            }
        } else {
            return ResponseEntity.badRequest().body("Mesa não encontrada.");
        }
    }

    @PostMapping("/confirmar/{id}")
    public ResponseEntity<String> confirmarReserva(@PathVariable Long id) {
        Optional<Reservas> reservaOpt = reservasRepository.findById(id);
        if (reservaOpt.isPresent()) {
            Reservas reserva = reservaOpt.get();
            if (reserva.getStatus() == Reservas.StatusReserva.PENDENTE) {
                reserva.setStatus(Reservas.StatusReserva.CONFIRMADA);
                reservasRepository.save(reserva);
                return ResponseEntity.ok("Reserva confirmada com sucesso.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Reserva não pode ser confirmada.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private boolean isMesaDisponivel(MesasReservadas mesaReservada, LocalTime horarioInicio, LocalTime horarioFim) {
        List<Reservas> reservas = reservasRepository.findReservasByHorario(mesaReservada, horarioFim, horarioInicio)
                .stream()
                .filter(reserva -> reserva.getStatus() == Reservas.StatusReserva.CONFIRMADA)
                .collect(Collectors.toList());
        return reservas.isEmpty();
    }
}