import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    if (!username || !name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const unniqueUsername = await User.findOne({ username });
    if (unniqueUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    

    const user = await User.create({
      username,
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res
      .cookie("MealMindAiAuth", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(usernameOrEmail)) {
      const existingUser = await User.findOne({ email: usernameOrEmail });
      if (!existingUser) {
        return res.status(404).json({ error: "Invalid credentials" });
      }
      const isPasswordValid = await existingUser.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const userWithoutPassword = { ...existingUser._doc };
      delete userWithoutPassword.password;
      return res
        .cookie("MealMindAiAuth", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          user: userWithoutPassword,
        });
    } else {
      const existingUser = await User.findOne({ username: usernameOrEmail });
      if (!existingUser) {
        return res.status(404).json({ error: "Invalid credentials" });
      }
      const isPasswordValid = await existingUser.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const userWithoutPassword = { ...existingUser._doc };
      delete userWithoutPassword.password;
      return res
        .cookie("MealMindAiAuth", token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          user: userWithoutPassword,
        });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res
      .clearCookie("MealMindAiAuth", {
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, name, email, profile } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (profile) {
      const cloudinaryResponse = await cloudinary.uploader.upload(profile, {
        folder: "MealMind.ai/Profile",
      });
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
      }
      return cloudinaryResponse;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        name,
        email,
        profile: {
          imageId: cloudinaryResponse.public_id || user?.profile?.imageId,
          imageUrl: cloudinaryResponse.secure_url || user?.profile?.imageUrl,
        },
      },
      { new: true }
    );

    const userWithoutPassword = { ...updatedUser._doc };
    delete userWithoutPassword.password;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    // Exclude the logged-in user
    const usersWithoutMe = users.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );

    return res.status(200).json({ users: usersWithoutMe });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

