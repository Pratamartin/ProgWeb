import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../services/user.service';

export async function exposeUser(req: Request, res: Response, next: NextFunction) {
  if (req.session.uid) {
    const user = await getUserById(req.session.uid);
    res.locals.user = user;
  } else {
    res.locals.user = null;
  }
  next();
}
