package com.mahmudalam.jobportal.spring_boot_job_portal_app.controller;

import com.mahmudalam.jobportal.spring_boot_job_portal_app.interfaces.UserRepository;
import com.mahmudalam.jobportal.spring_boot_job_portal_app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Adjust accordingly
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Signup endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // Login endpoint - updated to return userId
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = "dummy-jwt-token-for-" + user.getEmail();

        // Return userId along with token and role
        return ResponseEntity.ok(new LoginResponse(user.getId(), token, user.getRole()));
    }

    // Get current user profile endpoint
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String[] parts = token.split("-");
        if (parts.length < 1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        String email = parts[parts.length - 1];

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("name", user.getName());
            userInfo.put("email", user.getEmail());
            userInfo.put("role", user.getRole());

            if ("FREELANCER".equalsIgnoreCase(user.getRole())) {
                userInfo.put("bio", user.getBio());
                userInfo.put("skills", user.getSkills());
            } else if ("CLIENT".equalsIgnoreCase(user.getRole())) {
                userInfo.put("company", user.getCompany());
                userInfo.put("projects", user.getProjects());
            }
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Inner DTO for login response including userId
    static class LoginResponse {
        public String userId;
        public String token;
        public String role;

        public LoginResponse(String userId, String token, String role) {
            this.userId = userId;
            this.token = token;
            this.role = role;
        }
    }
}





