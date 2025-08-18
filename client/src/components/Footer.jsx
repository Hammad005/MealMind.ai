import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      <footer
        className={`border-t-2 bg-background/30 backdrop-blur border-primary/50 p-4 text-center flex lg:flex-row flex-col gap-2 items-center justify-between w-full ${
          (location.pathname === "/login" || location.pathname === "/signup") &&
          "hidden"
        }`}
      >
        <div className="lg:block hidden">
          <div className="flex gap-2">
            <img
              src={Logo}
              alt="logo"
              className="h-10 w-auto"
              style={{
                WebkitBoxReflect:
                  "below -4px linear-gradient(transparent, #ffffff62)",
              }}
            />
            <p
              style={{
                WebkitBoxReflect:
                  "below -22px linear-gradient(transparent, #ffffff62)",
              }}
              className="text-[1.8rem] tracking-widest font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-[#91ff02] to-primary/90"
            >
              MealMind<span className="text-sm">.ai</span>
            </p>
          </div>
        </div>
        <p className="text-sm text-primary">
          Copyright &copy; 2025 MealMind.ai - All rights reserved by 
          <Link to={"https://www.facebook.com/profile.php?id=61579227553830"} target="_blank" className="px-1 hover:underline text-foreground">
            Hammad Khatri
          </Link>
          ♡
        </p>
        <div className="gap-3 flex items-center justify-center">
          <Link to={"https://myportfolio-khaki-psi.vercel.app/"} target="_blank" className="text-primary hover:text-foreground font-bold text-lg">
            {"</>"}
            <p className="text-xs font-normal">Portfolio</p>
          </Link>
          <Link to={"https://www.facebook.com/profile.php?id=61579227553830"} target="_blank">
            <Facebook className="text-primary hover:text-foreground" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
