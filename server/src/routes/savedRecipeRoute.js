import express from "express";
import { getSavedRecipe, saveRecipe, saveSharedRecipe, unsaveRecipe } from "../controllers/savedRecipeController.js";
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router();
router.use(protectRoute);

router.post('/saveRescipe/:id', saveRecipe);
router.post('/saveSharedRescipe/:id', saveSharedRecipe);

router.delete("/unsaveRescipe/:id", unsaveRecipe);

router.get("/getSavedRecipe", getSavedRecipe);

export default router;