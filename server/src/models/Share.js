import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  recipe: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      imageId: {
        type: String,
        default: null,
      },
      imageUrl: {
        type: String,
        default: null,
      },
    },
    category: {
      type: String,
      required: true,
    },
  },
});

const Share = mongoose.model("Share", shareSchema);
export default Share;
