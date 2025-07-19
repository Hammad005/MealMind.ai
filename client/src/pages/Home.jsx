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
  const { contextSafe } = useGSAP();
  const animation = contextSafe(() => {
    const tl = gsap.timeline();
    tl.from(textRef.current.children, {
      opacity: 0,
      duration: 0.6,
      x: -100,
      ease: "power2.out",
      stagger: 0.2,
    });
  });
  useGSAP(() => {
    animation();
  });
  return (
    <>
      <div className="w-full lg:px-23 px-4 py-6 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          <div className="space-y-8 relative md:col-span-7">
            <h1
              ref={textRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <div>
                <span className="text-gray-900 dark:text-foreground">
                  Generate
                </span>
              </div>
              <div>
                <span className="text-primary">Custom Recipes</span>
              </div>
              <div className="pt-2">
                <span className="text-gray-900 dark:text-foreground">
                  Instantly Using
                </span>
              </div>
              <div className="pt-2 flex gap-3">
                <span className="text-gray-900 dark:text-foreground">AI</span>
                <span className="text-primary">Technology</span>
              </div>
            </h1>

            <div className="h-px w-full bg-primary" />

            <p className="text-sm md:text-lg text-foreground max-w-xl  mb-10">
              Chat with our AI assistant to discover personalized recipes based
              on your ingredients, preferences, and dietary needs.
            </p>

            <div className="flex items-center  md:gap-16 gap-4 mt-10 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl text-center text-primary">1.2k+</p>
                <p className="text-xs text-center text-muted-foreground uppercase mt-1">
                  Recipes Created
                </p>
              </div>
              <div className="w-px h-16 bg-gradient-to-t from-background via-primary to-background" />

              <div className="flex flex-col items-center">
                <p className="text-3xl text-center text-primary">30s</p>
                <p className="text-xs text-center text-muted-foreground uppercase  mt-1">
                  Avg. Generation Time
                </p>
              </div>
              <div className="w-px h-16 bg-gradient-to-t from-background via-primary to-background" />

              <div className="flex flex-col items-center">
                <p className="text-3xl text-center text-primary">100%</p>
                <p className="text-xs text-center text-muted-foreground uppercase  mt-1">
                  Personalized
                </p>
              </div>
            </div>

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
          <div className="h-[450px] w-full overflow-hidden md:mt-0 mt-5 md:col-span-5">
            <img src={hero} alt="" className="object-cover h-full mx-auto" />
          </div>
        </div>
        <Reviews />
      </div>
    </>
  );
};

export default Home;
