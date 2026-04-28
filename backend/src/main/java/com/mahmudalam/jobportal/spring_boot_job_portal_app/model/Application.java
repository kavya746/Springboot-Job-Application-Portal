package com.mahmudalam.jobportal.spring_boot_job_portal_app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "applications")
public class Application {
    @Id
    private String id;

    private String jobId;          // ID of the job applied for
    private String freelancerId;   // ID of the applying user (freelancer)
    private String freelancerName; // Store freelancer's name for quick display
    private String message;        // Optional message or cover letter
    private String status;         // e.g. "SUBMITTED", "REVIEWED", etc.

    private long appliedAt;        // Timestamp for application time

    // Can add other fields if needed (resume link, contact etc.)
}