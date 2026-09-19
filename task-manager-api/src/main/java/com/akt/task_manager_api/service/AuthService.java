package com.akt.task_manager_api.service;

import com.akt.task_manager_api.dto.AuthResponse;
import com.akt.task_manager_api.dto.LoginRequest;
import com.akt.task_manager_api.dto.RegisterRequest;
import com.akt.task_manager_api.entity.User;
import com.akt.task_manager_api.repository.UserRepository;
import com.akt.task_manager_api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException(
                    "An account with this email already exists"
            );
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .build();

        User savedUser = userRepository.save(user);

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .authorities("USER")
                        .build();

        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow();

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities("USER")
                        .build();

        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
