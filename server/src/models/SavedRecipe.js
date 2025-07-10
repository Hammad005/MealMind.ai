import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "History",
    },
  },
  {
    timestamps: true,
  }
);

const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);
export default SavedRecipe;
