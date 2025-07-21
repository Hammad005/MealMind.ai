import React from "react";
import { Button } from "./ui/button";
import { BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoSavedRecipes = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="text-center md:mt:4 mt-10">
        <h2 className="md:text-4xl animate-bounce font-bold md:mb-4 md:mt-0 mt-4 font-mono uppercase text-primary">
          No saved recipes yet
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md md:mx-auto md:text-sm text-xs">
          You haven't saved any recipes yet. Start generating AI-curated meals
          based on your ingredients, preferences, and dietary needs.
        </p>

        <Button
          size="lg"
          className="bg-transparent border border-primary text-foreground hover:text-white transition-colors  px-8 py-6 text-lg font-medium"
          onClick={() => navigate("/generate")}
        >
          <BrainCircuit className="h-5 w-5" />
          Generate Now
        </Button>
      </div>
    </>
  );
};

export default NoSavedRecipes;
