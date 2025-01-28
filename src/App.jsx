import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import Questions from "./Pages/Questions";
import Courses from "./Pages/Courses";
import Course from "./Pages/Course";
import Enroll from "./Pages/Enroll";
import Layout from "./Pages/Layout";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/questions" element={<Questions />} />

        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          {/* Role-based protected routes */}
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]} redirectPath="/login">
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]} redirectPath="/login">
                <Course />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:courseId/enroll"
            element={
              <ProtectedRoute allowedRoles={["user"]} redirectPath="/login">
                <Enroll />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
