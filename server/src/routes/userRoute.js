import express from "express";
import { getAllUsers, login, logout, sendToken, signup, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/middleware.js";
import passport from "passport";

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    prompt: 'select_account consent',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    // Send JWT token after successful login
    sendToken(req.user, res);
  }
);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/updateProfile', protectRoute, updateProfile);

router.get('/allUsers', protectRoute, getAllUsers);
router.get('/getProfile', protectRoute, (req, res) => res.status(200).json({ user: req.user }));

export default router;