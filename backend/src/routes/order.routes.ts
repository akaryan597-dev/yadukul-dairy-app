
import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/order.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .post(protect, authorize('Customer'), createOrder)
    .get(protect, authorize('Owner', 'Staff'), getOrders);

router.route('/:id')
    .put(protect, authorize('Owner', 'Staff'), updateOrderStatus);

export default router;
