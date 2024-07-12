package com.corvomanco.tavernateste.controllers;

import com.corvomanco.tavernateste.dto.DadosAtualizarMesa;
import com.corvomanco.tavernateste.dto.DadosCadastroMesas;
import com.corvomanco.tavernateste.dto.DadosDetalhamentoMesa;
import com.corvomanco.tavernateste.dto.DadosListagemMesa;
import com.corvomanco.tavernateste.entities.*;
import com.corvomanco.tavernateste.repository.JogosRepository;
import com.corvomanco.tavernateste.repository.MesasRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/mesas")
public class MesasController {

    private final MesasRepository mesasRepository;
    private final JogosRepository jogosRepository;

    public MesasController(MesasRepository mesasRepository, JogosRepository jogosRepository){

        this.mesasRepository = mesasRepository;
        this.jogosRepository = jogosRepository;
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemMesa>> listarMesas(){
        var lista = mesasRepository.findAll().stream().map(DadosListagemMesa::new).toList();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoMesa> detalhar(@PathVariable Long id){
        var mesas = mesasRepository.getReferenceById(id);
        return ResponseEntity.ok(new DadosDetalhamentoMesa(mesas));

    }

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoMesa> cadastrar(@RequestBody DadosCadastroMesas dados, UriComponentsBuilder uriBuilder){
        var mesas = new Mesas(dados);
        mesasRepository.save(mesas);
        var uri = uriBuilder.path("/api/mesas/{id}").buildAndExpand(mesas.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoMesa(mesas));

    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoMesa> atualizar(@RequestBody DadosAtualizarMesa dados){
        var mesas = mesasRepository.getReferenceById(dados.id());
        mesas.atualizarInformacoes(dados);
        return ResponseEntity.ok(new DadosDetalhamentoMesa(mesas));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        mesasRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("inativar/{id}")
    @Transactional
    public ResponseEntity<Void> inativar(@PathVariable Long id){
        var mesas = mesasRepository.getReferenceById(id);
        mesas.inativar();

        return ResponseEntity.noContent().build();
    }


    @PutMapping("reativar/{id}")
    @Transactional
    public ResponseEntity<Void> reativar(@PathVariable Long id){
        var mesas = mesasRepository.getReferenceById(id);
        mesas.setAtivo();
        return ResponseEntity.noContent().build();
    }
}
