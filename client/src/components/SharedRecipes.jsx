import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChefHat, Loader, Trash2, Type } from "lucide-react";
import { Button } from "./ui/button";
import DeleteSharedRecipe from "./DeleteSharedRecipe";
import { useSharedStore } from "@/store/useSharedStore";
import cld from "@/lib/cloudinary";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

const SharedRecipes = () => {
  const { sharedRecipes } = useSharedStore();
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(null);

  const renderRecipeCard = (entry) => {
    const profilePic = cld
      .image(entry?.sender?.profile?.imageId)
      .format("auto")
      .quality("auto")
      .resize(scale().width(400));

    return (
      <Card
        key={entry._id}
        onClick={() => navigate(`/shared-recipe/${entry._id}`)}
        className="recipe-card cursor-pointer dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden md:mt-4 mt-10"
      >
        <CardContent className="px-5 pb-6">
          <div className="flex justify-end">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                setRecipe(entry);
                setOpen(true);
              }}
            >
              <Trash2 />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <div className="flex items-start gap-3">
              {entry?.sender?.profile?.imageUrl ? (
                <div className="dark:bg-primary/50 bg-primary/80 overflow-hidden size-9 rounded-full border-2 border-primary flex items-center justify-center">
                <AdvancedImage cldImg={profilePic} className="h-full w-full object-cover"/>
              </div>
              ) : (
                <p
                className={
                  "dark:bg-primary/50 bg-primary/80 text-white shadow-xs hover:bg-primary/90 dark:hover:bg-primary/90 size-9 rounded-full border-2 border-primary flex items-center justify-center"
                }
              >
                {entry?.sender?.username[0].toUpperCase()}
              </p>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-foreground">
                  Shared by
                </h3>
                <p className="text-sm text-muted-foreground">
                  {entry?.sender?.username}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary mt-0.5">
                <Type className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Asked For</h3>
                <p className="text-sm text-muted-foreground">
                  "
                  {entry.text.length > 26
                    ? entry.text.slice(0, 26) + "..."
                    : entry.text}
                  "
                </p>
              </div>
            </div>
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
                <CalendarDays className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Shared At</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(entry?.createdAt).toLocaleString("en-GB", {
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
              {entry.recipe.description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const displayedRecipes = viewAll ? sharedRecipes : sharedRecipes?.slice(0, 3);

  return (
    <>
      <DeleteSharedRecipe open={open} setOpen={setOpen} recipe={recipe} />
      {displayedRecipes?.map(renderRecipeCard)}

      {sharedRecipes?.length > 3 && (
        <div className="flex justify-center md:mt-4 mt-10">
          <Button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View Less" : "View All"}
          </Button>
        </div>
      )}
    </>
  );
};

export default SharedRecipes;
