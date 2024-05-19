package com.taverna.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long Id;

    @NotBlank
    public int quantidadeDisponivel;
}
