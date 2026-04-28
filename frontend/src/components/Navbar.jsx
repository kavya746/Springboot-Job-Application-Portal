import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import logo from "/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Load user info from localStorage or fetch from API
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name"); // store user name on login
    setUserRole(role);
    setUserName(name);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const logout = () => {
    localStorage.clear();
    setUserRole(null);
    setUserName(null);
    navigate("/");
  };

  return (
    <nav
      className={`z-50 fixed top-0 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-primary"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-14 h-14" />
          <span
            className={`text-xl font-bold hidden sm:block ${
              scrolled ? "text-blue-600" : "text-sky-900"
            }`}
          >
            Connect & Collaborate
          </span>
        </Link>

        <div className="space-x-4 flex items-center relative" ref={dropdownRef}>
          {userRole ? (
            <>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                Hello, {userName || userRole}
                <span className="ml-1">&#x25BC;</span> {/* Down arrow */}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    View Profile
                  </button>
                  <hr />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-medium ${
                  scrolled ? "text-blue-600" : "text-sky-900"
                } hover:text-orange-400 transition-colors`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`font-medium ${
                  scrolled ? "text-blue-600" : "text-sky-900"
                } hover:text-orange-400 transition-colors`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;