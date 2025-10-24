
import express from 'express';
import { getMilkIntake, addMilkIntake } from '../controllers/milkIntake.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .get(protect, authorize('Owner'), getMilkIntake)
    .post(protect, authorize('Owner'), addMilkIntake);

export default router;
