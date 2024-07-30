package com.corvomanco.tavernateste.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;


@Table(name = "Usuario")
@Entity(name = "Usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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

    private String login;

    @Column(name = "senha", nullable = false)
    @NotBlank(message = "Informe uma senha.")
    private String senha;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return senha;
    }
    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return login;
    }
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }
    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_reservas", referencedColumnName = "id")
    private Reservas reservas;
}

