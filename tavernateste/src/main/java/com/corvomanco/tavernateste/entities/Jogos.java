package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
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
    private Long id;

    @NotBlank(message = "Nome é obrigatório.")
    @Length(max = 100, message = "Nome não deve exceder 100 caracteres.")
    @Length(min = 3, message = "Nome não deve ter menos que 3 caracteres.")
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "img_url")
    private String imgUrl;

    @NotBlank(message = "Categoria é obrigatória")
    @Length(max = 50, message = "Categoria não deve exceder 50 caracteres")
    @Column(name = "categoria", nullable = false, length = 50)
    private String categoria;

    @Column(name = "qtd_total")
    private int qtdTotal;

    @ManyToOne
    @JoinColumn(name = "reserva_id", nullable = false)
    private Reservas reserva;

    @Enumerated(EnumType.STRING)
    private StatusJogo status;

    public enum StatusJogo {
        PENDENTE,
        CONFIRMADO,
        CANCELADO
    }
}