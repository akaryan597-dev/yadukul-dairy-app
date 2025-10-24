
import { Request, Response } from 'express';
import Review from '../models/review.model';

export const getReviews = async (req: Request, res: Response) => {
    const reviews = await Review.find({});
    res.json(reviews);
};
