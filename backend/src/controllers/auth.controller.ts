
// FIX: Use direct imports for Express types.
import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// FIX: Use Request and Response for correct typing.
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      // FIX: Convert mongoose ObjectId to string for JWT token generation.
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

// FIX: Use Request and Response for correct typing.
export const registerUser = async (req: Request, res: Response) => {
  const { name, username, password, role } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    username,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// FIX: Use Request and Response for correct typing.
export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user!.id);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully!' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect current password.' });
  }
};
