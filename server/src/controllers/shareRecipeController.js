import Saved from "../models/Saved.js";
import Share from "../models/Share.js";
import History from "../models/History.js";

export const shareHistoryRecipe = async (req, res) => {
    const {receiverId} = req.params;
    const senderId = req.user._id;
    const {historyId} = req.body;
    try {
        const history = await History.findById(historyId);
        if (!history) {
            return res.status(404).json({ error: "History not found" });
        }
        const alreadyShared = await Share.findOne({
            sender: senderId,
            receiver: receiverId,
            "recipe.id": historyId
        });
        if (alreadyShared) {
            return res.status(400).json({ error: "Recipe already shared" });
        }
        
        const shareRecipe = await Share.create({
            sender: senderId,
            receiver: receiverId,
            text: history.text,
            recipe: {
                id: history._id,
                name: history.recipe.name,
                description: history.recipe.description,
                ingredients: history.recipe.ingredients,
                instructions: history.recipe.instructions,
                category: history.recipe.category
            }
        });
        return res.status(200).json({ shareRecipe });
    } catch (error) {
        console.error("Error in shareHistoryRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

export const shareSavedRecipe = async (req, res) => {
    const {receiverId} = req.params;
    const senderId = req.user._id;
    const {savedId} = req.body;
    try {
        const saved = await Saved.findById(savedId);
        if (!saved) {
            return res.status(404).json({ error: "Saved recipe not found" });
        }
        const shareRecipe = await Share.create({
            sender: senderId,
            receiver: receiverId,
            text: saved.text,
            recipe: {
                id: saved._id,
                name: saved.recipe.name,
                description: saved.recipe.description,
                ingredients: saved.recipe.ingredients,
                instructions: saved.recipe.instructions,
                category: saved.recipe.category
            }
        });
        return res.status(200).json({ shareRecipe });
    } catch (error) {
        console.error("Error in shareSavedRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

export const shareSharedRecipe = async (req, res) => {
  const {receiverId} = req.params;
    const senderId = req.user._id;
    const {sharedId} = req.body;
    try {
        const shared = await Share.findById(sharedId);
        if (!shared) {
            return res.status(404).json({ error: "Shared recipe not found" });
        }
        const shareRecipe = await Share.create({
            sender: senderId,
            receiver: receiverId,
            text: shared.text,
            recipe: {
                id: shared._id,
                name: shared.recipe.name,
                description: shared.recipe.description,
                ingredients: shared.recipe.ingredients,
                instructions: shared.recipe.instructions,
                category: shared.recipe.category
            }
        });
        return res.status(200).json({ shareRecipe });
    } catch (error) {
        console.error("Error in shareSharedRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }  
};

export const getSharedRecipe = async (req, res) => {
    try {
        const sharedRecipes = await Share.find({ receiver: req.user._id }).sort({ createdAt: -1 }).populate({
            path: "sender",
            select: "username profile"
        });
        return res.status(200).json({ sharedRecipes });
    } catch (error) {
        console.error("Error in getSharedRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
};
export const getSendedRecipe = async (req, res) => {
    try {
        const sendedRecipes = await Share.find({ sender: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({ sendedRecipes });
    } catch (error) {
        console.error("Error in getSendedRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

export const deleteSharedRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const sharedRecipe = await Share.findById(id);
        if (!sharedRecipe) {
            return res.status(404).json({ error: "Shared recipe not found" });
        };

        if (sharedRecipe.sender.toString() === req.user._id.toString()) {
            return res.status(400).json({ error: "You cannot delete your own shared recipe" });
        };
        await Share.findByIdAndDelete(id);

        const remainingSharedRecipe = await Share.find({ receiver: req.user._id }).sort({ createdAt: -1 }).populate({
            path: "sender",
            select: "username profile"
        });
        return res.status(200).json({ sharedRecipes: remainingSharedRecipe, message: "Shared recipe deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSharedRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
};