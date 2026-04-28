import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth";

export const isLoggedIn = () => !!localStorage.getItem("token");

export const getUserRole = () => {
  return localStorage.getItem("role"); // returns string like "FREELANCER" or "CLIENT"
};

// Other existing exports...
export const registerUser = (userData) => axios.post(`${API_BASE}/register`, userData);

export const loginUser = (credentials) => axios.post(`${API_BASE}/login`, credentials);