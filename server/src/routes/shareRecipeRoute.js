import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import Share from "../models/Share.js";
import History from "../models/History.js";

const router = express.Router();
router.use(protectRoute);

router.post("/:id", async (req, res) => {
    const myId = req.user._id;
    const { id } = req.params;
    try {
        const shareRecipe = await Share.create({
            sender: myId,
            receiver: id,
            recipe: id
        });
        const history = await History.findById(id);
        history.users.push(receiverId);
        await history.save();

        return res.status(200).json({ shareRecipe });
    } catch (error) {
        console.error("Error in shareRecipe:", error);
        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
});

export default router;