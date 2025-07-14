import React from "react";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FloatingShape from "./components/ui/FloatingShape";
import { Donut, Ham, Hamburger, IceCream, Pizza } from "lucide-react";

const App = () => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center 
      justify-center relative overflow-hidden"
      >
        <FloatingShape
          icon={Pizza}
          color="text-primary/90"
          size="w-64 h-64"
          top="-5%"
          left="0%"
          delay={0}
        />
        <FloatingShape
          icon={IceCream}
          color="text-primary/90"
          size="w-64 h-64"
          top="-5%"
          left="70%"
          delay={0}
        />
        <FloatingShape
          icon={Donut}
          color="text-primary/90"
          size="w-64 h-64"
          top="-5%"
          left="35%"
          delay={0}
        />
        <FloatingShape
          icon={Ham}
          color="text-primary/90"
          size="w-64 h-64"
          top="20%"
          left="70%"
          delay={0}
        />
        <FloatingShape
          icon={Hamburger}
          color="text-primary/90"
          size="w-64 h-64"
          top="20%"
          left="10%"
          delay={0}
        />

        <div className="z-20">
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
