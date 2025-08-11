import Saved from "../models/Saved.js";
import Share from "../models/Share.js";
import History from "../models/History.js";

export const saveRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await History.findById(id);
    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    const savedRecipe = await Saved.create({
      users: req.user._id,
      text: history.text,
      recipe: {
        id: history._id.toString(),
        name: history.recipe.name,
        description: history.recipe.description,
        ingredients: history.recipe.ingredients,
        instructions: history.recipe.instructions,
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

    const savedRecipe = await Saved.create({
      users: req.user._id,
      text: sharedRecipe.text,
      recipe: {
        id: sharedRecipe._id.toString(),
        name: sharedRecipe.recipe.name,
        description: sharedRecipe.recipe.description,
        ingredients: sharedRecipe.recipe.ingredients,
        instructions: sharedRecipe.recipe.instructions,
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
    await Saved.findByIdAndDelete(id);
    const savedRecipes = await Saved.find({ users: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ savedRecipes, message: "Recipe unsaved successfully" });
  } catch (error) {
    console.error("Error in unsaveRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const savedRecipes = await Saved.find({ users: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ savedRecipes });
  } catch (error) {
    console.error("Error in getSavedRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};