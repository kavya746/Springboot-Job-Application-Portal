import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; // ✅ Import the Profile page
import AppliedCandidates from "./pages/AppliedCandidates";
import ApplicationSuccess from "./pages/ApplicationSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/employer/create-job-post"
          element={
            <Layout>
              <CreatePost />
            </Layout>
          }
        />
        <Route
          path="/employee/feed"
          element={
            <Layout>
              <Feed />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        {/* ✅ Profile route added here */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      <Route
        path="/employer/applied-candidates/:jobId"
        element={
          <Layout>
            <AppliedCandidates />
          </Layout>
        }
      />
      <Route
        path="/employee/application-success"
        element={
          <Layout>
            <ApplicationSuccess />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;