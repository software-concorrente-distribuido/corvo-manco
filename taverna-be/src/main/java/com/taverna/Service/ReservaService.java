package com.taverna.Service;

import com.taverna.Entity.Reservas;
import com.taverna.Repository.ReservasRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class ReservaService {

    private final ReservasRepository reservasRepository;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public ReservaService(ReservasRepository reservasRepository) {
        this.reservasRepository = reservasRepository;
    }

    public void scheduleReservaCancellation(Reservas reserva) {
        scheduler.schedule(() -> {
            Optional<Reservas> reservaOpt = reservasRepository.findById(reserva.getId());
            if (reservaOpt.isPresent()) {
                Reservas pendingReserva = reservaOpt.get();
                if (pendingReserva.getStatus() == Reservas.StatusReserva.PENDENTE) {
                    pendingReserva.setStatus(Reservas.StatusReserva.CANCELADA);
                    reservasRepository.save(pendingReserva);
                }
            }
        }, 5, TimeUnit.MINUTES);
    }
}
