package com.mahmudalam.jobportal.spring_boot_job_portal_app.interfaces;

import com.mahmudalam.jobportal.spring_boot_job_portal_app.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByJobId(String jobId);
    List<Application> findByFreelancerId(String freelancerId);
}