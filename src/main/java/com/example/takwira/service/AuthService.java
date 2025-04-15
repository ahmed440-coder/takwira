package com.example.takwira.service;



import com.example.takwira.model.User;
import com.example.takwira.repository.UserRepository;
import com.example.takwira.util.JwtUtil;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    ArrayList<String> blacklistedTokens =new ArrayList<String>();

    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("User is saved !!!!!!!");
        userRepository.save(user);
    }

    public String authenticate(String email, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        User user = userRepository.findByEmail(email).orElseThrow();
        System.out.println("User is logged in !!!!!!!");
        return jwtUtil.generateToken(user);
    }


    public void logout(String token) {
        
        blacklistedTokens.add(token);
        System.out.println("user is out !!!!!!");
        System.out.println("Token invalidated and blacklisted: " + token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
