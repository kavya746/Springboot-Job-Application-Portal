import { useEffect, useState } from "react";
import { getApplicationsByJobId } from "../api/application";
import { useParams } from "react-router-dom";

const AppliedCandidates = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getApplicationsByJobId(jobId);
        setApplications(res.data);
      } catch (error) {
        alert("Failed to load applications");
      }
    };
    fetchData();
  }, [jobId]);

  return (
    <div className="pt-24 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Applied Candidates</h1>
      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="border p-4 rounded shadow">
              <p><strong>Name:</strong> {app.freelancerName}</p>
              <p><strong>Status:</strong> {app.status}</p>
              {app.message && <p><strong>Message:</strong> {app.message}</p>}
              <p><small>Applied at: {new Date(app.appliedAt).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedCandidates;