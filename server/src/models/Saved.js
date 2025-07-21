import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    recipe: {
      id: {
        type:  String,
        required: true,
      },
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
  },
  {
    timestamps: true,
  }
);

const Saved = mongoose.model("Saved", savedSchema);
export default Saved;
