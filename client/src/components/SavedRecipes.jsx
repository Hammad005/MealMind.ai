import { useSavedStore } from "@/store/useSavedStore";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Bookmark, CalendarDays, ChefHat, Loader } from "lucide-react";
import { Button } from "./ui/button";

const SavedRecipes = () => {
  const { savedRecipes, unsaveRecipe, savedRecipeLoading } = useSavedStore();
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);
  const [unsaveId, setUnsaveId] = useState("");

  const handleUnsave = (id) => {
    setUnsaveId(id);
    unsaveRecipe(id);
  };
  const renderRecipeCard = (entry) => (
    <Card
      key={entry._id}
      onClick={() => navigate(`/saved-recipe/${entry._id}`)}
      className="recipe-card cursor-pointer dark:bg-card/90 bg-primary/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors overflow-hidden md:mt-4 mt-10"
    >
      <CardContent className="px-5 pb-6">
        <div className="flex justify-end">
          {savedRecipeLoading && unsaveId === entry._id ? (
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                handleUnsave(entry._id);
              }}
              disabled
            >
              <Loader className="animate-spin" />
            </Button>
          ) : (
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                handleUnsave(entry._id);
              }}
            >
              <Bookmark className="fill-foreground" />
            </Button>
          )}
        </div>
        <p className="text-sm text-primary text-center italic mb-6 mt-0">
          You asked for:{" "}
          <span className="text-foreground">
            "
            {entry.text.length > 26
              ? entry.text.slice(0, 26) + "..."
              : entry.text}
            "
          </span>
        </p>
        <div className="flex md:flex-row flex-col justify-between gap-3">
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
              <h3 className="font-medium text-foreground">Saved At</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(entry.createdAt).toLocaleString("en-GB", {
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

  const displayedRecipes = viewAll ? savedRecipes : savedRecipes?.slice(0, 3);

  return (
    <>
      {displayedRecipes?.map(renderRecipeCard)}

      {savedRecipes?.length > 3 && (
        <div className="flex justify-center md:mt-4 mt-10">
          <Button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View Less" : "View All"}
          </Button>
        </div>
      )}
    </>
  );
};

export default SavedRecipes;
