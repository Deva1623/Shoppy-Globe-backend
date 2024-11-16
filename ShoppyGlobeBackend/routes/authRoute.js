import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 

// creating a router to manage our authentication-related routes
const router = express.Router();

// when someone wants to register, they hit this route
router.post('/register', registerUser); 

// this is where users will go to log in
router.post('/login', loginUser); 

export default router;
