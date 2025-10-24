declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        role: string;
      };
    }
  }
}

// FIX: Export an empty object to make this file a module and allow global augmentation.
export {};
