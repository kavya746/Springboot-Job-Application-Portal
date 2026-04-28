package com.mahmudalam.jobportal.spring_boot_job_portal_app.interfaces;

import com.mahmudalam.jobportal.spring_boot_job_portal_app.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}