package com.corvomanco.tavernateste.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservaDTO {
    //private Long idUsuario;
    private Long idMesa;
    private LocalDate inicio;
    private LocalDate fim;
}
