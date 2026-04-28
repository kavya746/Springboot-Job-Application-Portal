import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../api/auth"; // adjust the path as needed
import heroImage from "/assets/job-portal-hero.png";

const Home = () => {
  const navigate = useNavigate();

  const handleExploreJobs = () => {
    if (isLoggedIn()) {
      navigate("/employee/feed");
    } else {
      navigate("/signup");
    }
  };

  const handlePostJob = () => {
    if (isLoggedIn()) {
      navigate("/employer/create-job-post");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-10 pt-24">
      {/* Left Section - hidden on small screens */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={heroImage}
          alt="Job Portal"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0 px-4 pr-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Your Career, Your Future <span className="text-red-700">&</span>
          <br />The Right People, The Right Time
        </h1>
        <p className="text-lg text-gray-500 mb-6 text-justify">
          Welcome to our job portal - Connect & Collaborate!<br />
          where careers grow and businesses thrive.
          Find jobs tailored to your skills, or hire top-tier professionals to power your team.
          Smart recommendations, seamless applications, and a trusted network – everything you need to succeed, all in one place.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-start gap-4 justify-center">
          <button
            onClick={handleExploreJobs}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Explore Jobs
          </button>
          <button
            onClick={handlePostJob}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
