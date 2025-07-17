import React from "react";

const NoSharedRecipes = () => {
  return (
    <>
      <div className="text-center">
        <h2 className="md:text-4xl  font-bold md:mb-4 md:mt-0 mt-4 font-mono uppercase text-primary">
          No shared recipes
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md md:mx-auto md:text-sm text-xs">
          It looks like no one has shared any recipes with you yet. Once someone
          shares a recipe, it'll show up here.
        </p>
      </div>
    </>
  );
};

export default NoSharedRecipes;
