import mongoose from "mongoose";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profile: {
      imageId: {
        type: String,
        default: null,
      },
      imageUrl: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
