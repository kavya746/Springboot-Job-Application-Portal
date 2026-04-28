import axios from "axios";

const API_BASE = "http://localhost:8080/api/applications";

/**
 * Submit a job application by a freelancer
 * @param {Object} applicationData - {
 *   jobId: string,
 *   freelancerId: string,
 *   freelancerName?: string,
 *   message?: string,
 *   status?: string (optional),
 *   appliedAt?: number (optional)
 * }
 * @returns Axios Promise
 */
export const applyToJob = (applicationData) => {
  return axios.post(`${API_BASE}/apply`, applicationData);
};

/**
 * Get all applications for a given job (for clients)
 * @param {string} jobId - The job post ID
 * @returns Axios Promise resolving with list of applications
 */
export const getApplicationsByJobId = (jobId) => {
  return axios.get(`${API_BASE}/job/${jobId}`);
};