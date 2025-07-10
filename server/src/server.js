import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import historyRecipeRoute from "./routes/historyRecipeRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());


app.use('/api/auth', userRoute);
app.use('/api/history', historyRecipeRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})