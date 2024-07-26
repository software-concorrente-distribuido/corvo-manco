package com.corvomanco.tavernateste.controllers;

import com.corvomanco.tavernateste.entities.Usuario;
import com.corvomanco.tavernateste.infra.DadosTokenJWT;
import com.corvomanco.tavernateste.infra.TokenService;
import com.corvomanco.tavernateste.repository.UsuarioRepository;
import com.corvomanco.tavernateste.usuarios.DadosAutenticacao;
import com.corvomanco.tavernateste.usuarios.DadosRegistroUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<?> efetuarLogin(@RequestBody @Valid DadosAutenticacao dados) {
        var token = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var autenticacao = manager.authenticate(token);

        var tokenJWT = tokenService.gerarToken((Usuario) autenticacao.getPrincipal());

        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody @Valid DadosRegistroUsuario dados) {
        // Verificar se o login ou email já estão em uso
        if (usuarioRepository.findByLogin(dados.login()) != null) {
            return ResponseEntity.badRequest().body("Login já está em uso");
        }

        // Codificar a senha
        String senhaCodificada = passwordEncoder.encode(dados.senha());

        // Criar e salvar o novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(dados.nome());
        usuario.setEmail(dados.email());
        usuario.setTelefone(dados.telefone());
        usuario.setLogin(dados.login());
        usuario.setSenha(senhaCodificada);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

}
