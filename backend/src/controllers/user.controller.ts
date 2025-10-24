
// FIX: Use direct imports for Express types.
import { Request, Response } from 'express';
import User from '../models/user.model';

// FIX: Use Request and Response for correct typing.
export const getStaff = async (req: Request, res: Response) => {
  const staff = await User.find({ role: 'Staff' }).select('-password');
  res.json(staff);
};
