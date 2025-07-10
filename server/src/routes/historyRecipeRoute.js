import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  clearHistory,
  clearSingleHistory,
  createRecipe,
  getHistory,
  getSavedRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../controllers/historyRecipeController.js";

const router = express.Router();

router.use(protectRoute);

router.post("/createRescipe", createRecipe);
router.post("/saveRescipe/:id", saveRecipe);

router.get("/getHistory", getHistory);
router.get("/getSavedRecipe", getSavedRecipe);

router.put("/unsaveRescipe/:id", unsaveRecipe);

router.delete("/clearHistory", clearHistory);
router.delete("/clearSingleHistory/:id", clearSingleHistory);

export default router;
