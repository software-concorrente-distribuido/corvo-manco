package com.corvomanco.tavernateste.entities;

import com.corvomanco.tavernateste.dto.DadosAtualizarMesa;
import com.corvomanco.tavernateste.dto.DadosCadastroMesas;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "Mesas")
@Entity(name = "Mesas")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Mesas {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


    private int quantidade;

    private boolean ativo;

    public Mesas(DadosCadastroMesas dados) {
        this.quantidade = dados.quantidade();
    }

    public void atualizarInformacoes(DadosAtualizarMesa dados) {
        if(dados.quantidade() > 0){
            this.quantidade = dados.quantidade();
        }
    }

    public void inativar() {
        this.ativo = false;
    }

    public void setAtivo(){
        this.ativo = true;
    }
}
