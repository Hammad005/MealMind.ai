import ArrowIcon from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGSAP } from "@gsap/react";
import { BrainCircuit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useHistoryStore } from "@/store/useHistoryStore";
import RecipeGeneratingScreen from "@/components/RecipeGeneratingScreen";

const Generate = () => {
  // const {createRescipe, creatingRecipe} = useHistoryStore();

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);

  const [text, setText] = useState("");
  const [creatingRecipe, setCreatingRecipe] = useState(false);
  

  const stepsRef = useRef();
  const textareaRef = useRef();
  const buttonRef = useRef();
  const endAnimationRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(stepsRef.current.children, {
      opacity: 0,
      duration: 0.4,
      x: -100,
      ease: "power3.out",
      stagger: 0.2,
    })
      .from(
        textareaRef.current,
        {
          opacity: 0,
          duration: 0.5,
          y: -100,
        },
        "-=0.6"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          duration: 0.5,
          y: 100,
        },
        "-=0.6"
      );
  });

  // Outro animation (paused initially)
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(stepsRef.current.children, {
      opacity: 0,
      duration: 0.4,
      x: 100,
      ease: "power3.out",
      stagger: 0.2,
    })
      .to(
        textareaRef.current,
        {
          opacity: 0,
          duration: 0.5,
          y: 100,
        },
        "-=0.6"
      )
      .to(
        buttonRef.current,
        {
          opacity: 0,
          duration: 0.5,
          y: -100,
          onComplete: () => {
            setCreatingRecipe(true);
          },
        },
        "-=0.6"
      )

    endAnimationRef.current = tl; // Save it to the ref
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    endAnimationRef.current?.play();
  };

  return (
    <>
      {creatingRecipe ? (
        <RecipeGeneratingScreen/>
      ) : (<div className="w-full lg:px-23 px-4 py-6 flex flex-col  justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-12 pb-10">
          <div
            ref={stepsRef}
            className="flex md:flex-row flex-col items-center justify-center gap-10"
          >
            <div className="flex flex-col items-center justify-center md:w-60 w-80">
              <h3 className="text-base font-bold">1. Tell Us About You</h3>
              <p className="text-muted-foreground text-sm text-center">
                Tell us about your dietary needs, goals, and preferences — we'll
                do the rest.
              </p>
            </div>
            <ArrowIcon className="hidden lg:block lg:rotate-0 md:rotate-90 fill-primary" />
            <div className="flex flex-col items-center justify-center md:w-60 w-80">
              <h3 className="text-base font-bold">2. Let AI Do The Magic</h3>
              <p className="text-muted-foreground text-sm text-center">
                While you're grabbing a coffee, our AI is crafting your perfect
                meal for you.
              </p>
            </div>
            <ArrowIcon className="hidden lg:block lg:rotate-0 md:rotate-90 fill-primary" />

            <div className="flex flex-col items-center justify-center md:w-60 w-80">
              <h3 className="text-base font-bold">3. Receive Your Meal</h3>
              <p className="text-muted-foreground text-sm text-center">
                Get a personalized recipe with ingredients and instructions.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center justify-center gap-12"
          >
            <Textarea
              ref={textareaRef}
              placeholder={"What's in your mind?"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div ref={buttonRef}>
              <Button
                type="submit"
                size="lg"
                variant="outline"
                disabled={!text}
                className="bg-transparent border border-primary text-foreground hover:text-white dark:hover:bg-primary hover:bg-primary transition-colors  px-8 py-6 text-lg font-medium"
              >
                <BrainCircuit /> Generate Now
              </Button>
            </div>
          </form>
        </div>
      </div>)}
    </>
  );
};

export default Generate;
