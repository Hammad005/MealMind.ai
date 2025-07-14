import React from "react";
import signupHero from "../assets/singup.webp"

const Signup = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen  lg:px-23 px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full rounded-2xl border border-primary p-10">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-5xl font-bold tracking-tight">
              Signup
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome to MealMind - Where Ingredients Meet Intelligence
            </p>
          </div>
          <div className="w-full">
          <div className="h-full w-full overflow-hidden md:mt-0 mt-5">
                      <img src={signupHero} alt="" className="object-cover h-full mx-auto" />
                    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
