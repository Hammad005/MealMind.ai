import Reviews from "@/components/Reviews";
import React, { useRef } from "react";
import hero from "../assets/hero.png";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(textRef.current.children, {
      opacity: 0,
      duration: 0.6,
      x: -100,
      ease: "power2.out",
      stagger: 0.2,
    })
  })
  return (
    <>
      <div className="w-full lg:px-23 px-4 py-6 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-8 relative" >
            <h1 ref={textRef} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <div>
                <span className="text-gray-900 dark:text-foreground">Generate</span>
              </div>
              <div>
                <span className="text-primary">Custom Recipes</span>
              </div>
              <div className="pt-2">
                <span className="text-gray-900 dark:text-foreground">Instantly Using</span>
              </div>
              <div className="pt-2 flex gap-3">
                <span className="text-gray-900 dark:text-foreground">AI</span>
                <span className="text-primary">Technology</span>
              </div>
            </h1>

            <div className="h-px w-full bg-gradient-to-r dark:from-primary/50 dark:via-primary dark:to-primary/50 from-primary via-green-900 to-primary opacity-50" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size={"lg"}
                onClick={() => navigate("/generate")}
                className="px-8 py-6 text-lg font-medium"
              >
                <BrainCircuit className="ml-2 size-5" />
                  Generate Now
              </Button>
            </div>
          </div>
          <div className="h-[450px] w-full overflow-hidden md:mt-0 mt-5">
            <img src={hero} alt="" className="object-cover h-full mx-auto" />
          </div>
        </div>
        <Reviews />
      </div>
    </>
  );
};

export default Home;
