import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/logo.png';

const Footer = () => {
  const location = useLocation();
  return (
    <>
      <footer className={`border-t-2 bg-background/30 backdrop-blur border-primary/50 p-4 text-center flex items-center md:justify-between justify-center w-full ${
          (location.pathname === "/login" || location.pathname === "/signup") &&
          "hidden"
        }`}>
        <div className="md:block hidden">
          <div className="flex gap-2 blink">
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
                      MealMind
                    </p>
                  </div>
        </div>
        <p className="text-sm text-primary">
          Copyright &copy; 2025 MealMind
        </p>
        <div className="gap-3 md:flex hidden">
          <Link to={"https://www.facebook.com/"} target="_blank">
            <Facebook className="text-primary hover:text-white" />
          </Link>
          <Link to={"https://twitter.com/"} target="_blank">
            <Twitter className="text-primary hover:text-white" />
          </Link>
          <Link to={"https://www.instagram.com/"} target="_blank">
            <Instagram className="text-primary hover:text-white" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
