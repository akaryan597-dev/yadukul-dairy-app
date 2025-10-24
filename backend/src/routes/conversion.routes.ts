
import express from 'express';
import { getConversions, addConversion } from '../controllers/conversion.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .get(protect, authorize('Owner', 'Staff'), getConversions)
    .post(protect, authorize('Owner', 'Staff'), addConversion);

export default router;
