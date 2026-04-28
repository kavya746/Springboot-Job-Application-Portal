package com.mahmudalam.jobportal.spring_boot_job_portal_app.controller;

import com.mahmudalam.jobportal.spring_boot_job_portal_app.interfaces.ApplicationRepository;
import com.mahmudalam.jobportal.spring_boot_job_portal_app.interfaces.UserRepository;
import com.mahmudalam.jobportal.spring_boot_job_portal_app.model.Application;
import com.mahmudalam.jobportal.spring_boot_job_portal_app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for frontend origin
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    // Endpoint for freelancer to apply to a job
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestBody Application application) {
        // Validate freelancer exists
        Optional<User> freelancerOpt = userRepository.findById(application.getFreelancerId());
        if (freelancerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Freelancer not found");
        }

        // Optionally, check if application already exists (to avoid duplicates)
        // ...

        application.setFreelancerName(freelancerOpt.get().getName());
        application.setStatus("SUBMITTED");
        application.setAppliedAt(System.currentTimeMillis());

        applicationRepository.save(application);

        return ResponseEntity.ok("Application submitted successfully");
    }

    // Endpoint for client to get all applications for a job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsForJob(@PathVariable String jobId) {
        List<Application> applications = applicationRepository.findByJobId(jobId);
        return ResponseEntity.ok(applications);
    }
}