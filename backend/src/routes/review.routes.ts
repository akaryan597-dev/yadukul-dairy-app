
import express from 'express';
import { getReviews } from '../controllers/review.controller';

const router = express.Router();

router.route('/').get(getReviews);

export default router;
