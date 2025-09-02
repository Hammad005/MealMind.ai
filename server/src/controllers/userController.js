import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL);
export const googleAuth = async (req, res) => {
  const { code } = req.body;
  const { tokens } = await client.getToken({code,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL
  });
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload(); // contains Google profile
  const { sub: googleId, name, email, picture } = payload;

  // 3. Check if user exists
  let user = await User.findOne({ googleId });

  if (user) {
    // Case 1: Profile pic is updated manually → don’t overwrite
    if (user.profile?.isUpdated) {
      user.email = email;
    } else {
      // Case 2: Profile not updated → update image + email
      user.email = email;
      user.profile = {
        imageId: null,
        imageUrl: picture,
        isUpdated: false,
      };
    }

    await user.save();
  } else {
    // Case 3: No user exists → create new
    user = await User.create({
      googleId: googleId,
      username: email.split("@")[0],
      name: name,
      email: email,
      profile: {
        imageId: null,
        imageUrl: picture,
        isUpdated: false,
      },
    });
  };

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
};

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
  const { username, name, profile } = req.body;

  try {
    // Check for duplicate username
    if (username !== req.user.username) {
      const usernameExist = await User.findOne({ username });
      if (usernameExist) {
        return res.status(400).json({ error: "Username already in use" });
      }
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let updatedUser;

    // If profile image is provided, update it in Cloudinary
    if (profile) {
      if (user?.profile?.imageId) {
        await cloudinary.uploader.destroy(user.profile.imageId);
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(profile, {
        folder: "MealMind.ai/Profile",
      });

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
      }

      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          username,
          name,
          profile: {
            imageId: cloudinaryResponse.public_id,
            imageUrl: cloudinaryResponse.secure_url,
            isUpdated: true,
          },
        },
        { new: true }
      );
    } else {
      // If profile is not provided, update only other fields
      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { username, name },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found after update" });
    }

    const userWithoutPassword = { ...updatedUser._doc };
    delete userWithoutPassword.password;

    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -email -name");

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
