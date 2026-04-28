import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a production app, attach token from localStorage as Authorization header
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (loading) return <p className="pt-24 text-center">Loading profile...</p>;

  if (!user) return <p className="pt-24 text-center text-red-600">Failed to load profile.</p>;

  return (
    <div className="pt-24 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.role === "FREELANCER" && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Freelancer Profile</h2>
          <p><strong>Bio:</strong> {"I am a college student proficient in UI/UX" || "Not provided"}</p>
          <p><strong>Skills:</strong> {user.skills?.join(", ") || "Not provided"}</p>
          {/* Add other fields filled during signup or profile update */}
        </div>
      )}
{/* user.skills?.join(", ") */}
      {user.role === "CLIENT" && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Client Company Info</h2>
          <p><strong>Company Name:</strong> {user.company || "Not provided"}</p>
          <p><strong>Projects:</strong> {user.projects || "Not provided"}</p>
          {/* Add other client-specific fields */}
        </div>
      )}
    </div>
  );
};

export default Profile;