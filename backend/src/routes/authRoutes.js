// authRoutes.js
import express from 'express';
import { loginUser } from '../controllers/authController.js'; // Pastikan path-nya benar

const router = express.Router();

// Route untuk login
router.post('/login', loginUser);

export default router;
