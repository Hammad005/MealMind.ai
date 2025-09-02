import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import historyRecipeRoute from "./routes/historyRecipeRoute.js";
import shareRecipeRoute from "./routes/shareRecipeRoute.js";
import savedRecipeRoute from "./routes/savedRecipeRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({
    limit: '50mb'
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());


app.use('/api/auth', userRoute);
app.use('/api/history', historyRecipeRoute);
app.use('/api/saved', savedRecipeRoute);
app.use('/api/shareRecipe', shareRecipeRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
connectDB();