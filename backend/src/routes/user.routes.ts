
import express from 'express';
import { getStaff } from '../controllers/user.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/staff').get(protect, authorize('Owner'), getStaff);

export default router;
