import express from 'express'
import { signup, login , deleteUser} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const route = express.Router();


route.post("/auth/signup", signup);
 route.post("/auth/login", login); 
 route.post("/auth/delete",authMiddleware, deleteUser)

export default route;