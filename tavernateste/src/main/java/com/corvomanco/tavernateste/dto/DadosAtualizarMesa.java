package com.corvomanco.tavernateste.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarMesa(
        @NotNull
        Long id,
        int quantidade) {
}
