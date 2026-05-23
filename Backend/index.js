import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoute from "./routes/food.route.js";
import connectDB from "./config/db.js";
import getFood from "./Routes/getFood.route.js";
import { get } from "mongoose";
import auth from "./Routes/authRoute.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/", foodRoute);
app.use("/", getFood);
app.use("/", auth);


app.get("/", (req, res) => {
    res.send("AI Food Calorie API");
});

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});