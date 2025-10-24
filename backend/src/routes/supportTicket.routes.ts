
import express from 'express';
import { createSupportTicket, getSupportTickets } from '../controllers/supportTicket.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .post(protect, authorize('Customer'), createSupportTicket)
    .get(protect, authorize('Owner'), getSupportTickets);

export default router;
