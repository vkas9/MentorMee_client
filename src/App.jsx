import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import OpenRoute from "./components/ProtectedRoutes/openRoutes";
import HeroSection from "./components/Hero/HeroSection";
import Signup from "./components/Credentials/Signup";
import Login from "./components/Credentials/Login";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyEmail from "./components/ForgotPassword/VerifyEmail";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import SocialHub from "./components/SocialMediaPage/SocialHub";

function App() {
  return (
    <>
    <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "50px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      <div className="h-screen fixed top-0 left-0 w-screen bg-gradient-to-br  from-[#040c45] to-black text-white  ">
        <Router>
          <Navbar />

          <Routes>
          <Route
              path="/"
              element={
                
                  <HeroSection />
    
              }
            />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login/>
                 </OpenRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup/>
                 </OpenRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password/reset-password"
              element={
                <OpenRoute>
                  <ResetPassword />
                </OpenRoute>
              }
            />
            <Route
              path="social-hub"
              element={
                <SocialHub/>
              }
            />
            <Route
              path="signup/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
