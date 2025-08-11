import History from "../models/History.js";
import { GoogleGenAI } from "@google/genai";
import { prompt } from "../utils/index.js";

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
    const history = await History.find({ users: req.user._id }).sort({ createdAt: -1 });
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
    const histories = await History.find({ users: req.user._id });

    // Delete all history entries from DB
    await History.deleteMany({ users: req.user._id });
    const remainingHistory = await History.find({ users: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ message: "Your history cleared successfully", history:remainingHistory });
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
    await History.findByIdAndDelete(id);
    const remainingHistory = await History.find({ users: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ history: remainingHistory, message: "History cleared successfully" });
  } catch (error) {
    console.error("Error in clearSingleHistory:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
