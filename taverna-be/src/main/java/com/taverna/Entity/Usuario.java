package com.taverna.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "Usuario")
@Entity(name = "Usuario")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "senha", nullable = false)
    @NotBlank(message = "Informe uma senha.")
    private String senha;

    @Column(name = "nome", nullable = false)
    @NotBlank(message = "Nome é obrigatório.")
    @Size(max = 100, message = "Nome não deve exceder 100 caracteres.")
    @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres.")
    private String nome;

    @Email(message = "Email deve ser válido.")
    @NotBlank(message = "Email é obrigatório.")
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "telefone", nullable = false)
    @NotBlank(message = "Telefone é obrigatório.")
    @Size(max = 20, message = "Telefone não deve exceder 20 caracteres.")
    private String telefone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_reservas", referencedColumnName = "id")
    private Reservas reserva;
}
