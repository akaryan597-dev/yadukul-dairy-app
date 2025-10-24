
import jwt from 'jsonwebtoken';
// FIX: Use direct imports for Express types.
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

interface JwtPayload {
  id: string;
}

// FIX: Use Request, Response, and NextFunction for correct typing.
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = { id: user._id.toString(), name: user.name, role: user.role };
        next();
      } else {
        res.status(401).json({ message: 'Not authorized, user not found' });
      }

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// FIX: Use Request, Response, and NextFunction for correct typing.
const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};

export { protect, authorize };
