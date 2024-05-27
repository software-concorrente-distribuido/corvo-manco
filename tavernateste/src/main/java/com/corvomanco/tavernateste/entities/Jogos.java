package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Table(name = "Jogos")
@Entity(name = "Jogos")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Jogos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @NotBlank
    @Length(max = 100)
    public String nome;

    public String descricao;

    public String imgUrl;

    @NotBlank
    @Length(max = 50)
    public String categoria;

    public int qtdTotal;






}
