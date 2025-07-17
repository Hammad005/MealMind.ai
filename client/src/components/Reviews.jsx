import { USER_RECIPES } from "@/constants";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Utensils, ClipboardList } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          end: "bottom 100%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 100%",
          end: "bottom 100%",
          scrub: 2,
        },
      }
    );
    cardRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
            end: "bottom 100%",
            scrub: 2,
          },
        }
      );
    });
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 mt-20">
      {/* Showcase Header */}
      <div
        ref={sectionRef}
        className="dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-primary/40 dark:bg-background/70 ">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <span className="text-sm text-primary font-medium">
              Recipe Showcase
            </span>
          </div>
          <div className="md:text-sm text-xs text-white">AI-Generated Meals</div>
        </div>

        <div className="p-8 md:text-center">
          <h2 className="text-2xl  md:text-5xl font-bold md:mb-6">
            <span className="text-foreground">AI-Curated </span>
            <span className="text-primary">Recipe Collection</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Discover unique meals crafted by MealMind.ai assistant for users
            based on their ingredients, preferences, and dietary needs.
          </p>

          <div className="flex md:flex-row flex-col items-center justify-center md:gap-16 gap-4 mt-10 font-mono">
            <div className="flex flex-col items-center">
              <p className="text-3xl text-primary">1.2k+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                Recipes Created
              </p>
            </div>
            <div className="md:w-px w-full md:h-12 h-px md:bg-gradient-to-t bg-gradient-to-r dark:from-primary/50 dark:via-primary dark:to-primary/50 from-primary via-green-900 to-primary opacity-50" />

            <div className="flex flex-col items-center">
              <p className="text-3xl text-primary">30s</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                Avg. Generation Time
              </p>
            </div>
            <div className="md:w-px w-full md:h-12 h-px md:bg-gradient-to-t bg-gradient-to-r dark:from-primary/50 dark:via-primary dark:to-primary/50 from-primary via-green-900 to-primary opacity-50" />

            <div className="flex flex-col items-center">
              <p className="text-3xl text-primary">100%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                Personalized
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Cards */}

        <h1 ref={headingRef} className="text-xl flex flex-col font-bold text-center text-primary my-16">
          TESTIMONIALS
          <span className="text-2xl text-foreground ">
          Don't trust us. Trust them.
          </span>
        </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {USER_RECIPES.map((entry, index) => (
          <Card
            key={entry.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="recipe-card dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden"
          >
            <CardHeader className="px-5 py-0">
              <div className="grid grid-cols-[auto_1fr] gap-4 mb-4">
                <p className="dark:bg-primary/50 bg-primary/80 text-white h-16 w-16 text-2xl rounded-full border-2 border-primary flex items-center justify-center">
                  {entry?.name[0].toUpperCase()}
                </p>

                <div>
                  <CardTitle className="text-xl text-primary font-bold">
                    {entry.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    “{entry.text}”
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-6">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                    <ChefHat className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {entry.recipe.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.recipe.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      Ingredients ({entry.recipe.ingredients.length})
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {entry.recipe.ingredients.slice(0, 5).join(",\n")}...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Steps</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.recipe.instructions.length} Instructions
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px my-5 w-full bg-gradient-to-r from-primary via-green-900 to-primary opacity-50" />

              <div className="mt-5">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  <span className="text-primary">&gt; </span>
                  {entry.recipe.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
