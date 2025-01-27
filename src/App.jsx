import { Route, Router, Routes } from "react-router-dom";
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
        {/* <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin"]} redirectPath="/login" />
          }
        >
          <Route index element={<Home />} />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<Course />} />
          <Route path="courses/:courseId/enroll" element={<Enroll />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
