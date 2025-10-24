
import express from 'express';
import { getStaffActivities, logStaffActivity } from '../controllers/staffActivity.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .get(protect, authorize('Owner', 'Staff'), getStaffActivities)
    .post(protect, authorize('Staff'), logStaffActivity);

export default router;
