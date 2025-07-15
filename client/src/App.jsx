import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FloatingShape from "./components/ui/FloatingShape";
import {Hamburger, Pizza } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import Generate from "./pages/Generate";
import { Toaster } from "./components/ui/sonner";

const protectRoutes = (condition, children, naivagate) => {
  return condition ? children : <Navigate to={naivagate} />
};
const App = () => {
  const { checkAuth, getAllUsers, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
        if (user) getAllUsers();

  }, [user, getAllUsers]);
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <FloatingShape
          icon={Pizza}
          color="text-primary/90"
          size="w-70 h-70"
          top="-5%"
          left="0%"
          delay={0}
        />
        <FloatingShape
          icon={Hamburger}
          color="text-primary/90"
          size="w-70 h-70"
          top="20%"
          left="70%"
          delay={0}
        />

        <div className="z-20">
          <Navbar />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={protectRoutes(user, <Home/>, "/login")} />
            <Route path="/profile" element={protectRoutes(user, <Profile/>, "/login")} />
            <Route path="/generate" element={protectRoutes(user, <Generate/>, "/login")} />
            <Route path="/login" element={protectRoutes(!user, <Login/>, "/")} />
            <Route path="/signup" element={protectRoutes(!user, <Signup/>, "/")} />
          </Routes>
          <Toaster position="top-center"/>
        </div>
      </div>
    </>
  );
};

export default App;
