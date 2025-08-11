import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Faq = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { contextSafe } = useGSAP();
  const animation = contextSafe(() => {
    gsap.from(ref.current, {
      opacity: 0,
      duration: 1.3,
      y: -100,
      ease: "power3.out",
    });
  });
  useGSAP(() => {
    animation();
  });
  return (
    <>
      <div className="w-full lg:px-23 px-4 py-6 md:mt-10 min-h-screen">
        <Card
          ref={ref}
          className="flex flex-col items-center gap-6 md:px-24 px-4"
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-bold tracking-tight text-primary">
              FAQ
            </p>
            <h2 className="md:text-4xl font-bold md:mb-4 md:mt-0 mt-4">
              Confused? We got you.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <h4 className="text-base font-bold tracking-tight text-primary/80">
              What does MealMind.ai offer?
            </h4>
            <p className="text-sm">
              MealMind.ai is your personal AI-powered meal inspiration
              assistant. It generates creative, delicious, and easy-to-make
              recipes tailored to your tastes, dietary needs, and goals. You can
              save your favorite recipes, share them with friends, and even
              download them for offline use.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1  w-full">
            <h4 className="text-base font-bold tracking-tight text-primary/80">
              Who can benefit from MealMind.ai?
            </h4>
            <p className="text-sm">
              Anyone who wants to eat better without the stress of planning
              meals! Whether you're a busy professional, a fitness enthusiast, a
              student, or someone just looking for fresh ideas in the kitchen,
              MealMind.ai makes healthy and tasty eating simple.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1  w-full">
            <h4 className="text-base font-bold tracking-tight text-primary/80">
              How much does it cost?
            </h4>
            <p className="text-sm">
              MealMind.ai is completely free to generate recipe access,
              ingredient lists, and the ability to download and save them for
              offline use.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <h4 className="text-base font-bold tracking-tight text-primary/80">
              What diets do you support?
            </h4>
            <p className="text-sm">
              Our AI can whip up recipes for a variety of diets, including:
              <ul className="list-disc ml-4">
                <li>Omnivore</li>
                <li>Vegetarian</li>
                <li>Vegan</li>
                <li>Pescatarian</li>
                <li>Ketogenic</li>
                <li>Paleo</li>
                <li>Mediterranean</li>
                <li>Low Carb</li>
              </ul>
              If your diet isn't on the list, let us know — MealMind.ai is
              always learning!
            </p>
          </div>
          <Button
            className="flex items-center justify-center w-fit mt-4 hover:scale-105 transform transition-all duration-300 hover:bg-secondary"
            size={"lg"}
            onClick={() => navigate("/generate")}
          >
            I'm ready to streamline my meals
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Faq;
