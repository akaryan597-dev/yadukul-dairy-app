
import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/')
    .get(getProducts) // Publicly viewable
    .post(protect, authorize('Owner'), createProduct);

router.route('/:id')
    .put(protect, authorize('Owner'), updateProduct)
    .delete(protect, authorize('Owner'), deleteProduct);

export default router;
