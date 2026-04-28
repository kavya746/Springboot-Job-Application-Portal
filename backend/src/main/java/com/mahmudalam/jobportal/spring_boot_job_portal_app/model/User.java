package com.mahmudalam.jobportal.spring_boot_job_portal_app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    private String email;

    private String password; // Store the hashed password

    private String role; // e.g., "FREELANCER" or "CLIENT"

    // Additional fields
    private String bio;              // Freelancer biography
    private List<String> skills;     // Freelancer skills list

    private String company;          // Client company name
    private String projects;         // Client projects description or data

    // Lombok @Data generates getters, setters, constructors, etc.
}