import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import OpenRoute from "./components/ProtectedRoutes/openRoutes";
import HeroSection from "./components/Hero/HeroSection";
import Signup from "./components/Credentials/Signup";
import Login from "./components/Credentials/Login";
import { Toaster } from "react-hot-toast";

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
      <div className="h-screen bg-[#040c45] text-white overflow-y-auto ">
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
                // <OpenRoute>
                  <Login/>
                // </OpenRoute>
              }
            />

            <Route
              path="/signup"
              element={
                // <OpenRoute>
                  <Signup/>
                // </OpenRoute>
              }
            />
            
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
