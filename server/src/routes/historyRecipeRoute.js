import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  clearHistory,
  clearSingleHistory,
  createRecipe,
  getHistory,
} from "../controllers/historyRecipeController.js";

const router = express.Router();

router.use(protectRoute);

router.post("/createRescipe", createRecipe);

router.get("/getHistory", getHistory);

router.delete("/clearHistory", clearHistory);
router.delete("/clearSingleHistory/:id", clearSingleHistory);

export default router;
