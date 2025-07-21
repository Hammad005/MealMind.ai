import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import { deleteSharedRecipe, getSendedRecipe, getSharedRecipe, shareHistoryRecipe, shareSavedRecipe } from "../controllers/shareRecipeController.js";
const router = express.Router();
router.use(protectRoute);

router.post("/shareHistoryRecipe/:receiverId", shareHistoryRecipe);
router.post("/shareSavedRecipe/:receiverId", shareSavedRecipe);

router.get("/getSharedRecipe", getSharedRecipe);
router.get("/getSendedRecipe", getSendedRecipe);


router.delete("/deleteSharedRecipe/:id", deleteSharedRecipe)

export default router;