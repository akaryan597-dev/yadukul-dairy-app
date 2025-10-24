
import { Request, Response } from 'express';
import MilkIntake from '../models/milkIntake.model';

export const getMilkIntake = async (req: Request, res: Response) => {
    const intake = await MilkIntake.find({}).sort({ date: -1 });
    res.json(intake);
};

export const addMilkIntake = async (req: Request, res: Response) => {
    const { date, cowMilkLiters, buffaloMilkLiters } = req.body;
    const intake = new MilkIntake({ date, cowMilkLiters, buffaloMilkLiters });
    const createdIntake = await intake.save();
    res.status(201).json(createdIntake);
};
