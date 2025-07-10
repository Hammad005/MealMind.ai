import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
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
      .cookie("MealMindAuth", token, {
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
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
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
      .cookie("MealMindAuth", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res
      .clearCookie("MealMindAuth", {
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
  const { name, email, profile } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(profile, {
      folder: "MealMind/Profile",
    });
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        profile: {
          imageId: cloudinaryResponse.public_id,
          imageUrl: cloudinaryResponse.secure_url,
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
