import React, { useRef, useState } from "react";
import signupHero from "../assets/singup.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Info, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Signup = () => {
  const { signup, userLoading } = useAuthStore();
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [conPassword, setConPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.username) {
      newErrors.username = "Username is required.";
    } else if (data.username.length <= 3) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    if (!data.name) {
      newErrors.name = "Name is required.";
    } else if (data.name.length <= 3) {
      newErrors.name = "Name must be at least 4 characters.";
    }

    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!conPassword) {
      newErrors.conPassword = "Confirm Password is required.";
    }

    if (data.password !== conPassword) {
      newErrors.conPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      signup(data);
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

  const handleNavigateToLogin = () => {
    gsap.to(cardRef.current, {
      rotationY: 90,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => navigate("/login"),
    });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen lg:px-23 px-4 py-6">
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl rounded-2xl border border-primary shadow-xl dark:shadow-primary/20 shadow-primary/50 overflow-hidden"
        >
          <div className="w-full flex flex-col gap-3 p-10">
            <div className="mb-3">
              <h1 className="text-4xl font-bold tracking-tight uppercase text-primary text-shadow-lg dark:text-shadow-primary/30 text-shadow-primary/60">
                Signup
              </h1>
              <p className="text-xs font-mono ">
                MealMind - Where Ingredients Meet Intelligence
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 relative"
            >
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <Label
                    className={`${
                      errors.username ? "text-red-500" : "text-gray-400"
                    } text-xs tracking-wide font-mono`}
                    htmlFor="username"
                  >
                    Username:
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      className={"z-20"}
                      value={data.username}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs flex gap-1 items-center justify-end">
                        <Info className="size-[0.75rem]" /> {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    className={`${
                      errors.name ? "text-red-500" : "text-gray-400"
                    } text-xs tracking-wide font-mono`}
                    htmlFor="name"
                  >
                    Name:
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className={"z-20 "}
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs flex gap-1 items-center justify-end">
                        <Info className="size-[0.75rem]" /> {errors.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.email ? "text-red-500" : "text-gray-400"
                  } text-xs tracking-wide font-mono`}
                  htmlFor="email"
                >
                  Email:
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className={"z-20"}
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs flex gap-1 items-center justify-end">
                      <Info className="size-[0.75rem]" /> {errors.email}
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

              <div className="flex flex-col gap-1">
                <Label
                  className={`${
                    errors.conPassword ? "text-red-500" : "text-gray-400"
                  } text-xs tracking-wide font-mono`}
                  htmlFor="conPassword"
                >
                  Confirm Password:
                </Label>
                <div className="flex flex-col gap-1 relative">
                  <Input
                    type={showConPass ? "text" : "password"}
                    name="password"
                    placeholder="******"
                    className="z-20"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                  <div className="absolute mt-4.5 right-3 transform -translate-y-1/2 z-20">
                    {!showConPass ? (
                      <Eye
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowConPass(true)}
                      />
                    ) : (
                      <EyeOff
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowConPass(false)}
                      />
                    )}
                  </div>
                  {errors.conPassword && (
                    <p className="text-xs text-red-500 flex gap-1 items-center justify-end">
                      <Info className="size-[0.75rem] " /> {errors.conPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  className={"px-12"}
                  type="submit"
                  disabled={userLoading}
                >
                  {userLoading ? <Loader className="animate-spin" /> : "Signup"}
                </Button>
              </div>
              <p className="text-sm text-center z-20">
                Already have an account?{" "}
                <span
                  onClick={handleNavigateToLogin}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
              <div className="h-[130px] lg:hidden block absolute bottom-0 right-0 transform translate-x-1/2 pl-5 translate-y-1/2">
                <img
                  src={signupHero}
                  alt="signup"
                  className="object-cover h-full mx-auto"
                />
              </div>
            </form>
          </div>
          <div className="w-full dark:bg-primary/10 bg-primary/20 hidden lg:flex flex-col justify-center p-10">
            <div className="h-[300px] w-full overflow-hidden md:mt-0 mt-5">
              <img
                src={signupHero}
                alt="signup"
                className="object-cover h-full mx-auto"
              />
            </div>
            <h3 className="text-sm xl:text-base font-bold text-center text-primary mt-5">
              MealMind - Where Ingredients Meet Intelligence
            </h3>
            <p className="text-gray-400 text-xs text-center font-mono">
              Start your smart cooking journey with MealMind.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
