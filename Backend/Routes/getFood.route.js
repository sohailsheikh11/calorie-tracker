import getFood from "../controllers/getFood.controller.js";
import deleteFood from "../controllers/deleteFood.js";
import express from 'express'


const router = express.Router();


router.get("/food", getFood);
router.delete("/food/:id", deleteFood);


export default router;

