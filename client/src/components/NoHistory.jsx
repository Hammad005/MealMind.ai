import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BrainCircuit, History } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NoHistory = () => {
  const navigate = useNavigate();
  const headingRef = useRef();
  const descRef = useRef();
  const btnRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(headingRef.current, { opacity: 0, duration: 1.5 })
      .from(descRef.current, { opacity: 0, duration: 1 }, "-=0.7")
      .from(btnRef.current, { opacity: 0, duration: 1, y: 20 }, "-=0.7");
  }, []);
  return (
    <div className="text-center pb-20 flex flex-col items-center">
      <div className="bg-primary rounded-md p-2 flex items-center justify-center animate-bounce">
        <History />
      </div>
      <h2
        ref={headingRef}
        className="md:text-4xl text-xl  font-bold mt-4 font-mono uppercase text-primary"
      >
        No recipe history yet
      </h2>
      <p
        ref={descRef}
        className="text-muted-foreground mb-6 max-w-md md:mx-auto md:text-sm text-xs"
      >
        You haven't generated any recipes yet. Click below to start creating
        personalized meals using AI.
      </p>

      <Button
        size="lg"
        ref={btnRef}
        className="bg-transparent border border-primary text-foreground hover:text-white transition-colors  px-8 py-6 text-lg font-medium"
        onClick={() => navigate("/generate")}
      >
        <BrainCircuit className="h-5 w-5" />
        Generate Now
      </Button>
    </div>
  );
};

export default NoHistory;
