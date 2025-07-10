import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { createRecipe } from "../controllers/historyRecipeController.js";

const router = express.Router();

router.use(protectRoute);

router.post('/createRescipe', createRecipe);

export default router;