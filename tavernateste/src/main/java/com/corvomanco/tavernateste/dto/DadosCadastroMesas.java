package com.corvomanco.tavernateste.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record DadosCadastroMesas(

        int quantidade,
        boolean ativo
       ) {

    /*public DadosCadastroMesas(Mesas mesas){
        this(mesas.getQuantidadeDisponivel(), mesas.getHorarioinicio(), mesas.getHorariofim());
    }*/

}
