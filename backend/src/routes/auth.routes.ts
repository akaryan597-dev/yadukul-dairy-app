
import express from 'express';
import { loginUser, registerUser, changePassword } from '../controllers/auth.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', protect, authorize('Owner'), registerUser); // Only owner can create staff
router.put('/change-password', protect, changePassword);

export default router;
