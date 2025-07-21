import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Progress } from "./ui/progress";
import { useHistoryStore } from "@/store/useHistoryStore";

const RecipeGeneratingScreen = () => {
  const {progress} = useHistoryStore();
  // Adjust based on your logic
  const sparkleRef = useRef(null);
  const plateRef = useRef(null);
  const textRef = useRef(null);

    const { contextSafe } = useGSAP();
    const animation = contextSafe(() => {
const tl = gsap.timeline();

    tl.fromTo(
      plateRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "bounce.out" }
    )
      .fromTo(
        sparkleRef?.current?.children,
        { opacity: 0 },
        {
          opacity: 1,
          y: -20,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "linear",
        }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "<0.5"
      );
    })
  useGSAP(() => {
    animation()
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pb-20">
      <svg
        width="240"
        height="240"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        ref={plateRef}
      >
        {/* Plate */}
        <ellipse
          cx="100"
          cy="140"
          rx="60"
          ry="20"
          className="dark:fill-muted-foreground fill-primary"
        />
        <ellipse
          cx="100"
          cy="150"
          rx="40"
          ry="15"
          className="dark:fill-muted-foreground/70 fill-primary/70"
        />
        <ellipse
          cx="100"
          cy="138"
          rx="50"
          ry="14"
          className="fill-gray-300"
        />

        {/* Meal spark */}
        <g ref={sparkleRef} transform="translate(100, 100)">
          <path
            d="M0,-6 L1,-1 L6,0 L1,1 L0,6 L-1,1 L-6,0 L-1,-1 Z"
            className="fill-primary"
            transform="scale(1.2)"
          />
          <path
            d="M0,-5 L0.8,-0.8 L5,0 L0.8,0.8 L0,5 L-0.8,0.8 L-5,0 L-0.8,-0.8 Z"
            className="fill-primary/80"
            transform="translate(12, -10) scale(0.8)"
          />
          <path
            d="M0,-4 L0.6,-0.6 L4,0 L0.6,0.6 L0,4 L-0.6,0.6 L-4,0 L-0.6,-0.6 Z"
            className="fill-primary/70"
            transform="translate(-12, -6) scale(0.9)"
          />
          <path
            d="M0,-3 L0.5,-0.5 L3,0 L0.5,0.5 L0,3 L-0.5,0.5 L-3,0 L-0.5,-0.5 Z"
            className="fill-primary/60"
            transform="translate(6, 10) scale(0.7)"
          />
        </g>

        
      </svg>

      <div className="w-2xs mt-4" ref={textRef}>
        <p className="text-center text-muted-foreground text-sm mb-2">
          Generating up your personalized meal...
        </p>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default RecipeGeneratingScreen;
