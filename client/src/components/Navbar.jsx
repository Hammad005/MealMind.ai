import React, { useEffect, useRef } from "react";
import {
  BrainCircuit,
  ChartNoAxesGantt,
  Cookie,
  History,
  Home,
  Loader,
  LogIn,
  LogOut,
  MessageSquareQuote,
  Sparkle,
  User,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModeToggle } from "./ui/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef();

  const asideRef = useRef();
  const asideDataRef = useRef();
  const menuTlRef = useRef();

  const { logout, userLoading, authLoading, user } = useAuthStore();

  
  const { contextSafe } = useGSAP();

  const animateNav = contextSafe(() => {
    if (authLoading) return;
    gsap.from(navRef?.current?.children, {
      opacity: 0,
      duration: 0.8,
      y: -100,
      ease: "power2.out",
      stagger: 0.4,
    });
  });

  const handleMenu = contextSafe(() => {
    let tl = gsap.timeline({
      paused: true,
      onStart: () => {
        document.body.style.overflow = "hidden"; // Disable scroll
      },
      onReverseComplete: () => {
        document.body.style.overflow = "auto"; // Enable scroll
      },
    });
    tl.to(asideRef.current, {
      top: 0,
      duration: 0.5,
      ease: "power2.out",
      overflowY: "none",
    }).from(asideDataRef?.current?.children, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.2,
    });

    menuTlRef.current = tl;
  });

  useGSAP(() => {
    handleMenu();
  });
  useGSAP(() => {
    animateNav()
  }, [authLoading]);

  useEffect(() => {
    menuTlRef.current?.reverse();
  }, [location.pathname]);

  
  return (
    <>
      <nav
        className={`w-full lg:px-23 px-4 py-6 flex items-center justify-between ${
          (location.pathname === "/login" || location.pathname === "/signup") &&
          "hidden"
        } z-50`}
        ref={navRef}
      >
        <Link to={'/'} className="flex gap-2 ">
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
                "below -23px linear-gradient(transparent, #ffffff62)",
            }}
            className="text-[1.3rem] sm:text-[1.8rem] lg:text-[1.8rem] md:text-[1.8rem] flex items-center tracking-widest font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-[#91ff02] to-primary/90"
          >
            MealMind<span className="text-sm">.ai</span>
          </p>
        </Link>

        <div className="flex gap-4">
          <div className="lg:flex items-center justify-center gap-8 hidden ">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "font-bold text-sm flex items-start gap-2 text-primary"
                  : "font-semibold text-sm flex items-start gap-2 hover:text-primary"
              }`}
            >
              <Home size={18} className="text-primary" />
              Home
            </Link>

            <Link
              to="/generate"
              className={`${
                location.pathname === "/generate"
                  ? "font-bold text-sm flex items-start gap-2 text-primary"
                  : "font-semibold text-sm flex items-start gap-2 hover:text-primary"
              }`}
            >
              <BrainCircuit size={18} className="text-primary" />
              Generate
            </Link>
            <Link
              to="/faq"
              className={
                location.pathname === "/faq"
                  ? "font-bold text-sm flex items-start gap-2 text-primary"
                  : "font-semibold text-sm flex items-start gap-2 hover:text-primary"
              }
            >
              <MessageSquareQuote size={18} className="text-primary" />
              FAQ
            </Link>
            <Link
              to="/privacypolicy"
              className={
                location.pathname === "/privacypolicy"
                  ? "font-bold text-sm flex items-start gap-2 text-primary"
                  : "font-semibold text-sm flex items-start gap-2 hover:text-primary"
              }
            >
              <Cookie size={18} className="text-primary" />
              Privacy Policy
            </Link>

            <ModeToggle />
          </div>

          <div className="lg:hidden flex items-center justify-center gap-4 z-50">
            <Button
              onClick={() => menuTlRef.current?.play()}
              variant="outline"
              size={"icon"}
            >
              <ChartNoAxesGantt size={25} className="rotate-90" />{" "}
            </Button>
          </div>

          {user ? <DropdownMenu>
            <DropdownMenuTrigger>
              {user?.profile?.imageUrl ? (
                <div className="dark:bg-primary/50 bg-primary/80 overflow-hidden size-9 rounded-full border-2 border-primary flex items-center justify-center">
                <img src={user?.profile?.imageUrl} alt="avatar" className="h-full w-full object-cover object-top"/>
              </div>
              ) : (
                <p
                className={
                  "dark:bg-primary/50 bg-primary/80 text-white shadow-xs hover:bg-primary/90 dark:hover:bg-primary/90 size-9 rounded-full border-2 border-primary flex items-center justify-center"
                }
              >
                {user?.username[0].toUpperCase()}
              </p>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={7} align="end">
              <DropdownMenuLabel className={"text-primary"}>
                {user?.username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  <User size={18} className="text-primary" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/history">
                <DropdownMenuItem>
                  <History size={18} className="text-primary" />
                  History
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={logout} disabled={userLoading}>
                {userLoading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    logging out...
                  </>
                ) : (
                  <>
                    <LogOut size={18} className="text-primary" />
                    Logout
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : 
          <Button asChild className={"lg:flex hidden"}>
            <Link to="/login"><LogIn size={18} /> Login</Link>
          </Button>
          }
        </div>
      </nav>

      <aside
        ref={asideRef}
        className="lg:hidden flex items-center justify-center gap-4 backdrop-blur-lg h-screen w-full fixed -top-[100%] z-50 bg-primary/10 overflow-y-auto"
      >
        <div ref={asideDataRef} className="flex flex-col items-start justify-center gap-4">
        <div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => menuTlRef.current?.reverse()}
            className="absolute top-6 right-6 "
          >
            <X />
          </Button>
        </div>
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "font-bold text-xl flex items-start gap-2 text-primary"
              : "font-semibold text-xl flex items-start gap-2 hover:text-primary"
          }`}
        >
          <Home size={22} className="text-primary" />
          Home
        </Link>

        <Link
          to="/generate"
          className={`${
            location.pathname === "/generate"
              ? "font-bold text-xl flex items-start gap-2 text-primary"
              : "font-semibold text-xl flex items-start gap-2 hover:text-primary"
          }`}
        >
          <BrainCircuit size={22} className="text-primary" />
          Generate
        </Link>
        <Link
          to="/faq"
          className={
            location.pathname === "/faq"
              ? "font-bold text-xl flex items-start gap-2 text-primary"
              : "font-semibold text-xl flex items-start gap-2 hover:text-primary"
          }
        >
          <MessageSquareQuote size={22} className="text-primary" />
          FAQ
        </Link>
        <Link
          to="/privacypolicy"
          className={
            location.pathname === "/privacypolicy"
              ? "font-bold text-xl flex items-start gap-2 text-primary"
              : "font-semibold text-xl flex items-start gap-2 hover:text-primary"
          }
        >
          <Cookie size={22} className="text-primary" />
          Privacy Policy
        </Link>
        <div className="flex gap-2 mt-4">
          <ModeToggle />
          {user ? <Button className={"px-8"} disabled={userLoading} onClick={() => {
            menuTlRef.current?.reverse()
            logout()
          }}>
            {userLoading ? <Loader className="animate-spin" /> : "Logout"}
          </Button> : 
          <Button className={"px-8"} onClick={() => {
            menuTlRef.current?.reverse()
          }} asChild>
            <Link to="/login"><LogIn/> Login</Link>
          </Button>
          }
        </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
