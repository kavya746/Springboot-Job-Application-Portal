import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "FREELANCER",
    bio: "",
    skills: "",
    company: "",
    projects: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation for required fields
    if (!form.name || !form.email || !form.password) {
      setError("Name, Email, and Password are required");
      return;
    }

    // Role-specific validations
    if (form.role === "FREELANCER" && (!form.bio || !form.skills)) {
      setError("Bio and Skills are required for freelancers");
      return;
    }

    if (form.role === "CLIENT" && (!form.company || !form.projects)) {
      setError("Company and Projects information is required for clients");
      return;
    }

    try {
      // Convert skills string to array, trimming spaces
      const userPayload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        bio: form.role === "FREELANCER" ? form.bio : null,
        skills:
          form.role === "FREELANCER"
            ? form.skills.split(",").map((skill) => skill.trim())
            : null,
        company: form.role === "CLIENT" ? form.company : null,
        projects: form.role === "CLIENT" ? form.projects : null,
      };

      await registerUser(userPayload);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center pt-24 px-4 min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="FREELANCER">Freelancer</option>
          <option value="CLIENT">Client</option>
        </select>

        {/* Show freelancer additional inputs */}
        {form.role === "FREELANCER" && (
          <>
            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}

        {/* Show client additional inputs */}
        {form.role === "CLIENT" && (
          <>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="projects"
              placeholder="Projects Info"
              value={form.projects}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;