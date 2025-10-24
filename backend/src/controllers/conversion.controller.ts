
import { Request, Response } from 'express';
import Conversion from '../models/conversion.model';

export const getConversions = async (req: Request, res: Response) => {
    const conversions = await Conversion.find({}).sort({ date: -1 });
    res.json(conversions);
};

export const addConversion = async (req: Request, res: Response) => {
    const { date, milkUsedLiters, curdProducedKg, paneerProducedKg } = req.body;
    const conversion = new Conversion({ date, milkUsedLiters, curdProducedKg, paneerProducedKg });
    const createdConversion = await conversion.save();
    res.status(201).json(createdConversion);
};
