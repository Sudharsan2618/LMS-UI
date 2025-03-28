// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/Signup";
// import { Toaster } from "react-hot-toast";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import Questions from "./Pages/Questions";
// import Courses from "./Pages/Courses";
// import Course from "./Pages/Course";
// import Enroll from "./Pages/Enroll";
// import Layout from "./Pages/Layout";
// import AuthRoute from "./Components/AuthRoute";
// import Ebooks from "./Pages/Ebooks";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route element={<AuthRoute />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Route>

//         <Route path="/questions" element={
//           <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
//             <Questions />
//           </ProtectedRoute>
//         } />

//         <Route path="/" element={<Layout />}>
//           <Route
//             index
//             element={
//               <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/ebooks"
//             element={
//               <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
//                 <Ebooks />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="courses"
//             element={
//               <ProtectedRoute allowedRoles={["user", "admin"]} redirectPath="/login">
//                 <Courses />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="courses/:courseId"
//             element={
//               <ProtectedRoute allowedRoles={["user", "admin"]} redirectPath="/login">
//                 <Course />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="courses/:courseId/enroll"
//             element={
//               <ProtectedRoute allowedRoles={["user"]} redirectPath="/login">
//                 <Enroll />
//               </ProtectedRoute>
//             }
//           />
//         </Route>

//         <Route path="*" element={<>Page not found</>}>

//         </Route>
//       </Routes>
//       <Toaster />
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthRoute from "./Components/AuthRoute";
import StudentProfile from "./Pages/StudentProfile";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/Signup"));
const Questions = lazy(() => import("./Pages/Questions"));
const Courses = lazy(() => import("./Pages/Courses"));
const Course = lazy(() => import("./Pages/Course"));
const Enroll = lazy(() => import("./Pages/Enroll"));
const Layout = lazy(() => import("./Pages/Layout"));
const Ebooks = lazy(() => import("./Pages/Ebooks"));
const JobsPage = lazy(() => import("./Pages/Jobs"));


function App() {
  return (
    <>
      <Suspense fallback={<>

        <div className="flex items-center justify-center h-screen  bg-primary-light">
          <div className="flex flex-col items-center">
            <div className=" size-12 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
            <p className="text-black mt-4 text-lg">Loading...</p>
          </div>
        </div></>}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route path="/questions" element={
            <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
              <Questions />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ebooks"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                  <Ebooks />
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
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={["user"]} redirectPath="/login">
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                  <JobsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;