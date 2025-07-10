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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Recipe",
    },
});

const Share = mongoose.model("Share", shareSchema);
export default Share;