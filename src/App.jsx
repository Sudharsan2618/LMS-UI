import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./api/Components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin"]} redirectPath="/login" />
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
