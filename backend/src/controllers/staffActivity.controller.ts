
import { Request, Response } from 'express';
import StaffActivity from '../models/staffActivity.model';

export const getStaffActivities = async (req: Request, res: Response) => {
    const activities = await StaffActivity.find({}).sort({ timestamp: -1 });
    res.json(activities);
};

export const logStaffActivity = async (req: Request, res: Response) => {
    const { staffId, staffName, action } = req.body;
    const activity = new StaffActivity({
        staffId: staffId || req.user!.id,
        staffName: staffName || req.user!.name,
        action
    });
    const createdActivity = await activity.save();
    res.status(201).json(createdActivity);
};
