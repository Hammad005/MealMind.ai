import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useHistoryStore } from "@/store/useHistoryStore";
import { useGSAP } from "@gsap/react";
import { Bookmark, CalendarDays, ChefHat, ClipboardList, Share, Utensils } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import cld from "@/lib/cloudinary";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { Button } from "@/components/ui/button";

const Recipe = () => {
  useEffect(() => {
      window.scrollTo(0, 0, { behavior: "smooth" });
    }, []);
  const { historyRecipes } = useHistoryStore();
  const { id } = useParams();
  const userRecipe = historyRecipes?.find(
    (recipe) => recipe?._id.toString() === id
  );
  const cardRef = useRef();
  const { contextSafe } = useGSAP();
  const animation = contextSafe(() => {
    gsap.from(cardRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  useGSAP(() => {
    animation();
  }, []);

  const [viewAll, setViewAll] = useState(false);

  const recipeImage = cld
    .image(userRecipe?.recipe?.image?.imageId)
    .format("auto")
    .quality("auto")
    .resize(scale().width("auto"));

  return (
    <>
      <div className="flex items-center justify-center lg:px-23 px-4 py-6 md:my-10 min-h-screen">
        <Card
          ref={cardRef}
          className="max-w-4xl  dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-primary/50 transition-colors overflow-hidden p-0"
        >
          <div className="w-full md:h-[350px] h-[300px] overflow-hidden">
            <AdvancedImage
              cldImg={recipeImage}
              className="h-full w-full object-cover hover:scale-120 transition-transform"
            />
          </div>
          <CardHeader className="px-5">
            <p className="text-sm text-primary text-center italic">
              You asked for:{" "}
              <span className="text-foreground">“{userRecipe.text}”</span>
            </p>
            <div className="flex justify-end gap-2">
            <Button size={"icon"} variant={"outline"}>
              <Bookmark className="fill-foreground"/>
            </Button>
            <Button size={"icon"} variant={"outline"}>
              <Share/>
            </Button>
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
                    {userRecipe.recipe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {userRecipe.recipe.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    Ingredients (
                    {userRecipe.recipe.ingredients.split(",").length})
                  </h3>
                  <ul className="md:text-sm hidden text-xs text-muted-foreground list-disc marker:text-primary list-inside md:grid grid-cols-2 pt-2">
                    {userRecipe.recipe.ingredients
                      .split(",")
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                      ))}
                  </ul>
                  <ul className="md:text-sm md:hidden text-xs text-muted-foreground list-disc marker:text-primary list-inside  pt-2">
                    {(viewAll
                      ? userRecipe.recipe.ingredients.split(",")
                      : userRecipe.recipe.ingredients.split(",").slice(0, 8)
                    ).map((ingredient, index) => (
                      <li key={index}>{ingredient.trim()}</li>
                    ))}

                    {userRecipe.recipe.ingredients.split(",").length > 8 && (
                      <span
                        className="text-primary font-semibold hover:underline cursor-pointer col-span-full"
                        onClick={() => setViewAll(!viewAll)}
                      >
                        {viewAll ? "View Less" : "View All"}
                      </span>
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                  <Utensils className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    {userRecipe.recipe.instructions}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">Generated At</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(userRecipe.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px my-5 w-full bg-gradient-to-r from-primary via-green-900 to-primary opacity-50" />

            <div className="mt-5">
              <p className="text-sm text-muted-foreground line-clamp-4">
                <span className="text-primary">&gt; </span>
                {userRecipe.recipe.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Recipe;
