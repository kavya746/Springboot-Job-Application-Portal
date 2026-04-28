import { Link } from "react-router-dom";

const ApplicationSuccess = () => {
  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Application Submitted Successfully!</h1>
        <p className="mb-6 text-gray-700">
          Thank you for applying. The client will review your application shortly.
        </p>
        <Link
          to="/employee/feed"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Job Feed
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSuccess;