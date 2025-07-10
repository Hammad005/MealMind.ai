import History from "../models/History.js";
import cloudinary from "../lib/cloudinary.js";
import { GoogleGenAI } from "@google/genai";
import { fetchPexelsImage, prompt } from "../utils/index.js";
import User from "../models/User.js";

export const createRecipe = async (req, res) => {
  const { text } = req.body;

  const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

  try {
    // Generate AI response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt(text),
    });
    const output = response?.text;

    let recipeIntoJSON;
    try {
      recipeIntoJSON = JSON.parse(output);
    } catch (parseErr) {
      throw new Error("Failed to parse AI response into JSON.");
    }

    // Fetch image from Pexels using recipe name
    const pexelsImageUrl = await fetchPexelsImage(recipeIntoJSON?.name);

    let imageData = {
      imageId: null,
      imageUrl: null,
    };

    if (pexelsImageUrl) {
      const uploadResult = await cloudinary.uploader.upload(pexelsImageUrl, {
        folder: "MealMind/Recipes",
      });

      imageData = {
        imageId: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
      };
    }

    // Save history
    const history = await History.create({
      users: [req.user._id],
      text,
      recipe: {
        name: recipeIntoJSON?.name,
        description: recipeIntoJSON?.description,
        ingredients: recipeIntoJSON?.ingredients,
        instructions: recipeIntoJSON?.instructions,
        category: recipeIntoJSON?.category,
        image: imageData,
      },
    });

    return res.status(201).json({
      message: "Recipe created successfully",
      history,
    });
  } catch (error) {
    console.error("Error in createRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const saveRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const history = await History.findById(id);
    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }
    user.savedRecipes.recipe.push(history._id);
    await user.save();
    return res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error in saveRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const unsaveRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const history = await History.findById(id);
    if (!history) {
      return res.status(404).json({ error: "Recipe history not found" });
    }

    // Filter out the recipe from savedRecipes
    user.savedRecipes = user.savedRecipes.filter(
      (entry) => entry.recipe.toString() !== history._id.toString()
    );

    await user.save();

    return res.status(200).json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    console.error("Error in unsaveRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id });
    return res.status(200).json({ history });
  } catch (error) {
    console.error("Error in getHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "savedRecipes.recipe"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error("Error in getSavedRecipe:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const histories = await History.find({ users: req.user._id });

    for (const history of histories) {
      // Remove user ID from the users array
      history.users = history.users.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      if (history.users.length === 0) {
        // Delete the history if no users are left
        await History.findByIdAndDelete(history._id);
      } else {
        // Save the updated history
        await history.save();
      }
    }

    return res.status(200).json({ message: "Your history cleared successfully" });
  } catch (error) {
    console.error("Error in clearHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const clearSingleHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const history = await History.findOne({ _id: id, users: req.user._id });

    if (!history) {
      return res.status(404).json({ error: "History not found or not accessible" });
    }

    // Remove the user ID from the users array
    history.users = history.users.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    if (history.users.length === 0) {
      // Delete the history if no users are left
      await History.findByIdAndDelete(id);
    } else {
      // Otherwise, save the updated history
      await history.save();
    }

    return res.status(200).json({ message: "History entry cleared for this user" });
  } catch (error) {
    console.error("Error in clearSingleHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
