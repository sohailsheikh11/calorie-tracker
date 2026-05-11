import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoute from "./routes/food.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/food", foodRoute);

app.get("/", (req, res) => {
    res.send("AI Food Calorie API");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});