import { Request, Response, NextFunction } from 'express';

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.uid) {
    return res.redirect('/login');
  }
  next();
}
