import axios from "axios";

export const prompt = (text) =>
  "You are a JSON recipe generator for a web app. " +
  'Based on the input "' +
  text +
  '" (like a dish name, list of ingredients, or dietary keywords), generate only 1 **unique** recipe idea. ' +
  "⚠️ Never repeat a recipe that has already been generated before — ensure uniqueness in name, ingredients, and description every time. " +
  "Return the result in pure JSON format, as a single object, strictly following this schema: " +
  "  { " +
  '    "name": "Recipe name, the name should be simple so the other API that is used for image understands easily (String, required)", ' +
  '    "description": "Short description of the recipe (String, required)", ' +
  '    "ingredients": "Comma-separated list of ingredients (String, required). ⚠️ Do NOT include commas inside individual ingredients (e.g., write \'diced onion\' instead of \'onion, diced\').", ' +
  '    "instructions": "Step-by-step instructions in a single string (String, required)", ' +
  '    "category": "Category like \'Dessert\', \'Main Course\', \'Vegan\', etc. (String, required)", ' +
  '    "pexelsQuery": "A simplified, image-search-friendly version of the recipe name (in English). ⚠️ This must vary slightly every time, even if the recipe name is reused, to prevent repeated images from the Pexels API." ' +
  "  } " +
  "⚠️ Important rules: " +
  "1. DO NOT wrap the JSON in triple backticks (```). " +
  "2. DO NOT return any text before or after the JSON. " +
  "3. DO NOT return an array — only a single JSON object. " +
  "4. The output must start directly with `{` and end with `}` — no surrounding text or formatting. " +
  "5. Always ensure the recipe is **different** from any previous outputs. No repetition. " +
  "6. Ensure the `pexelsQuery` is always in simple English and slightly changed each time (e.g., 'chocolate cake top view', 'simple chocolate cake', etc.) to avoid repeated images. " +
  "Follow this constraint to avoid post-cleaning logic like: " +
  'if (jsonText.startsWith("```")) { ' +
  '  jsonText = jsonText.replace(/```[a-zA-Z]*\\s*([\\s\\S]*?)\\s*```/, "$1").trim(); ' +
  "} " +
  'const firstBrace = jsonText.indexOf("{"); ' +
  'const lastBrace = jsonText.lastIndexOf("}"); ' +
  "if (firstBrace !== -1 && lastBrace !== -1) { " +
  "  jsonText = jsonText.substring(firstBrace, lastBrace + 1); " +
  "} " +
  'Generate only 1 unique recipe idea based on the "' +
  text +
  '" and return only the valid JSON object described above — nothing else.';


const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export const fetchPexelsImage = async (query) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: query,
        per_page: 1,
        orientation: "landscape",
      },
    });

    const photos = response.data.photos;
    if (photos && photos.length > 0) {
      return photos[0].src.large; // or use 'original' or 'medium'
    } else {
      return null;
    }
  } catch (error) {
    console.error("Pexels API error:", error.message);
    return null;
  }
};
