import History from "../models/History.js";
import cloudinary from "../lib/cloudinary.js";
import { GoogleGenAI } from "@google/genai";
import { fetchPexelsImage, prompt } from "../utils/index.js";

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
        folder: "MealMind/Recipes/History",
      });

      imageData = {
        imageId: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
      };
    }

    // Save history
    const history = await History.create({
      users: req.user._id,
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

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ history });
  } catch (error) {
    console.error("Error in getHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

export const clearHistory = async (req, res) => {
  try {
    // Find all history items for this user
    const histories = await History.find({ user: req.user._id });

    // Delete associated Cloudinary images (if any)
    await Promise.all(
      histories.map(async (item) => {
        if (item?.recipe?.image?.imageId) {
          await cloudinary.uploader.destroy(item.recipe.image.imageId);
        }
      })
    );

    // Delete all history entries from DB
    await History.deleteMany({ user: req.user._id });

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
    const history = await History.findById(id);
    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }
    if (history?.recipe?.image?.imageId) {
      await cloudinary.uploader.destroy(history.recipe.image.imageId);
    }
    await History.findByIdAndDelete(id);
    return res.status(200).json({ message: "History cleared successfully" });
  } catch (error) {
    console.error("Error in clearSingleHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
