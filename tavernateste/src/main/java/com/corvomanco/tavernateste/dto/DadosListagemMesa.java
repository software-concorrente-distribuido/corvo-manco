package com.corvomanco.tavernateste.dto;

import com.corvomanco.tavernateste.entities.Mesas;

public record DadosListagemMesa(Long id, int quantidadeDisponivel) {
    public DadosListagemMesa(Mesas mesas){
        this(mesas.getId(), mesas.getQuantidade());
    }
}
