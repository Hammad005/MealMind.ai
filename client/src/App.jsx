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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { useSavedStore } from "./store/useSavedStore";
import { useHistoryStore } from "./store/useHistoryStore";
import { useSharedStore } from "./store/useSharedStore";
import Recipe from "./pages/Recipe";
import History from "./pages/History";
import SavedRecipe from "./pages/SavedRecipe";
import SharedRecipe from "./pages/SharedRecipe";
import Faq from "./pages/Faq";
import NotFound from "./components/NotFound";

const protectRoutes = (condition, children, naivagate) => {
  return condition ? children : <Navigate to={naivagate} />
};
const App = () => {
  const { checkAuth, getAllUsers, authLoading, authenticated } = useAuthStore();
  const {getSavedRecipes} = useSavedStore();
  const {getHistoryRecipes} = useHistoryStore();
  const {getSharedRecipes, getSendedRecipe} = useSharedStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
        if (authenticated ) {
          getAllUsers()
          getSavedRecipes()
          getHistoryRecipes()
          getSharedRecipes()
          getSendedRecipe()
        }

  }, [authenticated, getAllUsers, getSavedRecipes, getHistoryRecipes, getSharedRecipes, getSendedRecipe]);

  if (authLoading) return <LoadingScreen/>

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
            <Route path="*" element={<NotFound/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={protectRoutes(authenticated, <Profile/>, "/login")} />
            <Route path="/generate" element={protectRoutes(authenticated, <Generate/>, "/login")} />
            <Route path="/recipe/:id" element={protectRoutes(authenticated, <Recipe/>, "/login")} />
            <Route path="/saved-recipe/:id" element={protectRoutes(authenticated, <SavedRecipe/>, "/login")} />
            <Route path="/shared-recipe/:id" element={protectRoutes(authenticated, <SharedRecipe/>, "/login")} />
            <Route path="/history" element={protectRoutes(authenticated, <History/>, "/login")} />
            <Route path="/faq" element={<Faq/>} />
            <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
            <Route path="/login" element={protectRoutes(!authenticated, <Login/>, "/")} />
            <Route path="/signup" element={protectRoutes(!authenticated, <Signup/>, "/")} />
          </Routes>
          <Footer/>
          <Toaster position="top-center"/>
        </div>
      </div>
    </>
  );
};

export default App;
