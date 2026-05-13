import getFood from "../controllers/getFood.controller.js";
import deleteFood from "../controllers/deleteFood.js";
import express from 'express'


const router = express.Router();


router.get("", getFood);
router.delete("/:id", deleteFood);


export default router;

