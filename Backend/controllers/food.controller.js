import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Food from "../model/calorie.model.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"),
            mimeType,
        },
    };
}

export const analyzeFood = async (req, res) => {
    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const image = fileToGenerativePart(
            req.file.path,
            req.file.mimetype
        );

        const prompt = `
        Analyze this food image.

        Return:
        - meal_type ("Breakfast", "Lunch", "Dinner", "Snack")
        - food_name
        - estimated_calories
        - protein
        - carbs
        - fat

        Give response in JSON format.
        `;

        const result = await model.generateContent([
            prompt,
            image,
        ]);

        const response = result.response.text();

        const cleanedText = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

        const foodData = JSON.parse(cleanedText);

        console.log("this is the response",response);
        console.log("this is the food data", foodData);

        const savedFood = await Food.create({

           
      meal_type: foodData.meal_type,

      food_name: foodData.food_name,

      calories: foodData.estimated_calories || 0,

      protein: parseFloat(foodData.protein) || 0,

      carbs: parseFloat(foodData.carbs) || 0,

      fat: parseFloat(foodData.fat) || 0

    });

         

        res.json({
            success: true,
            data: savedFood,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};