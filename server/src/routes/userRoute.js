import express from "express";
import { getAllUsers, googleAuth, login, logout, signup, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.post('/google', googleAuth)

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/updateProfile', protectRoute, updateProfile);

router.get('/allUsers', protectRoute, getAllUsers);
router.get('/getProfile', protectRoute, (req, res) => res.status(200).json({ user: req.user }));

export default router;