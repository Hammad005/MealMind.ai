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
        folder: "MealMind/Recipes",
      });

      imageData = {
        imageId: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
      };
    }
    
    // Save history
    const history = await History.create({
      user: req.user._id,
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