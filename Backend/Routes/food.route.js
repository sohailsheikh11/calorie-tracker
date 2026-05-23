import express from "express";
import multer from "multer";
import { analyzeFood } from "../controllers/food.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

router.post("api/food/analyze", upload.single("image"), analyzeFood);

export default router;