import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Info, Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import loginHero from "../assets/login.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleLogo from '../assets/googleLogo.png';

const Login = () => {
  const { login, userLoading } = useAuthStore();
  const [data, setData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.usernameOrEmail) {
      newErrors.usernameOrEmail = "Username or Email is required.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      login(data);
    }
  };

  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { rotationY: -90, transformOrigin: "top center", opacity: 0 },
      {
        rotationY: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  });

  const navigate = useNavigate();

  const handleNavigateToSignup = () => {
    gsap.to(cardRef.current, {
      rotationY: 90,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => navigate("/signup"),
    });
  };

  const handleGoogleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // from Google Cloud
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_CALLBACK_URL; // your frontend redirect route
    const SCOPE = "openid email profile";
    const RESPONSE_TYPE = "code";

    // Force account chooser every time → prompt=select_account
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=consent%20select_account`;

    window.location.href = url;
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen lg:px-23 px-4 py-6">
        <div
          ref={cardRef}
          className="grid grid-cols-1 max-w-4xl lg:grid-cols-2 rounded-2xl  border border-primary shadow-xl dark:shadow-primary/20 shadow-primary/50 overflow-hidden"
        >
          <div className="w-full dark:bg-primary/10 bg-primary/20 hidden lg:flex flex-col justify-center p-10 relative">
            <Button
              className={"absolute top-5 left-5"}
              onClick={() => navigate("/")}
              size={"sm"}
              variant={"ghost"}
            >
              <ArrowLeft />
            </Button>
            <div className="h-[300px] w-full overflow-hidden md:mt-0 mt-5">
              <img
                src={loginHero}
                alt=""
                className="object-cover h-full mx-auto"
              />
            </div>
            <h3 className="text-sm xl:text-base font-bold text-center text-primary mt-5 whitespace-nowrap">
              MealMind.ai - Where Ingredients Meet Intelligence
            </h3>
            <p className="text-gray-400 text-xs text-center font-mono">
              Log in to continue your smart cooking journey with MealMind.ai
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 p-10 justify-center relative">
            <Button
              className={"absolute top-3 left-2 lg:hidden"}
              onClick={() => navigate("/")}
              size={"sm"}
              variant={"ghost"}
            >
              <ArrowLeft />
            </Button>
            <div className="mb-3">
              <h1 className="text-4xl font-bold tracking-tight uppercase text-primary text-shadow-lg dark:text-shadow-primary/30 text-shadow-primary/60">
                Login
              </h1>
              <p className="text-xs font-mono">
                Welcome Back - Log in to continue your smart cooking journey
                with MealMind.ai
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 relative"
            >
              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.usernameOrEmail ? "text-red-500" : "text-gray-400"
                  } text-xs tracking-wide font-mono`}
                  htmlFor="usernameOrEmail"
                >
                  Username or Email:
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Enter your username or email"
                    className={"z-20"}
                    value={data.usernameOrEmail}
                    onChange={(e) =>
                      setData({ ...data, usernameOrEmail: e.target.value })
                    }
                  />
                  {errors.usernameOrEmail && (
                    <p className="text-red-500 text-xs flex gap-1 items-center justify-end">
                      <Info className="size-[0.75rem]" />{" "}
                      {errors.usernameOrEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.password ? "text-red-500" : "text-gray-400"
                  } text-xs tracking-wide font-mono`}
                  htmlFor="password"
                >
                  Password:
                </Label>
                <div className="flex flex-col gap-1 relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="******"
                    className="z-20"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <div className="absolute mt-4.5 right-3 transform -translate-y-1/2 z-20">
                    {!showPass ? (
                      <Eye
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowPass(true)}
                      />
                    ) : (
                      <EyeOff
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowPass(false)}
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs flex gap-1 items-center justify-end">
                      <Info className="size-[0.75rem]" /> {errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className={"px-12"}
                  type="submit"
                  disabled={userLoading}
                >
                  {userLoading ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </div>
            </form>
            <div className="w-full flex items-center justify-center">
              <span className="text-sm font-semibold text-center text-primary">
                or
              </span>
            </div>
            <Button
              type="button"
              className={"w-full"}
              variant={"outline"}
              onClick={handleGoogleLogin}
              disabled={userLoading}
            >
              <img src={GoogleLogo} alt="Google" className="w-4 h-4" />
              Continue with Google
            </Button>

            <p className="text-sm text-center mt-2 z-20">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={handleNavigateToSignup}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>

            <div className="h-[130px] lg:hidden block absolute bottom-0 left-0 transform -translate-x-1/3 pr-10 translate-y-1/6">
              <img
                src={loginHero}
                alt="login"
                className="object-cover h-full mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
