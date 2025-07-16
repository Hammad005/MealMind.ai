import cloudinary from "../lib/cloudinary.js";
import Saved from "../models/Saved.js";
import Share from "../models/Share.js";

export const saveRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await History.findById(id);
    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(history.recipe.image.imageUrl, {
      folder: "MealMind.ai/Recipes/Saved",
    });
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
    };

    const savedRecipe = await Saved.create({
      user: req.user._id,
      text: history.text,
      recipe: {
        name: history.recipe.name,
        description: history.recipe.description,
        ingredients: history.recipe.ingredients,
        instructions: history.recipe.instructions,
        image: {
          imageId: cloudinaryResponse.public_id,
          imageUrl: cloudinaryResponse.secure_url,
        },
        category: history.recipe.category
      }    
    });

    return res.status(200).json({savedRecipe, message: "Recipe saved successfully"});
  } catch (error) {
    console.error("Error in saveRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const saveSharedRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const sharedRecipe = await Share.findById(id);
    if (!sharedRecipe) {
      return res.status(404).json({ error: "Shared recipe not found" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(sharedRecipe.recipe.image.imageUrl, {
      folder: "MealMind.ai/Recipes/Saved",
    });
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
    };

    const savedRecipe = await Saved.create({
      user: req.user._id,
      text: sharedRecipe.text,
      recipe: {
        name: sharedRecipe.recipe.name,
        description: sharedRecipe.recipe.description,
        ingredients: sharedRecipe.recipe.ingredients,
        instructions: sharedRecipe.recipe.instructions,
        image: {
          imageId: cloudinaryResponse.public_id,
          imageUrl: cloudinaryResponse.secure_url,
        },
        category: sharedRecipe.recipe.category
      }    
    });

    return res.status(200).json({savedRecipe, message: "Recipe saved successfully"});
  } catch (error) {
    console.error("Error in saveSharedRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const unsaveRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const savedRecipe = await Saved.findById(id);
    if (!savedRecipe) {
      return res.status(404).json({ error: "Saved recipe not found" });
    }
    const cloudinaryResponse = await cloudinary.uploader.destroy(savedRecipe.recipe.image.imageId);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
    };
    await Saved.findByIdAndDelete(id);
    return res.status(200).json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    console.error("Error in unsaveRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const savedRecipes = await Saved.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ savedRecipes });
  } catch (error) {
    console.error("Error in getSavedRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};