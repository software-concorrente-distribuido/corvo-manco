package com.corvomanco.tavernateste.dto;

import com.corvomanco.tavernateste.entities.Mesas;

public record DadosDetalhamentoMesa(Long id, int quantidade) {
    public DadosDetalhamentoMesa(Mesas mesas){
        this(mesas.getId(), mesas.getQuantidade());
    }
}
