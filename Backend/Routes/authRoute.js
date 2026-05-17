import express from 'express'
import { signup, login , deleteUser} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const route = express.Router();


route.post("/signup", signup);
 route.post("/login", login); 
 route.post("/delete",authMiddleware, deleteUser)

export default route;