import { Request, Response } from 'express';
import { getTopRanking } from '../services/game.service';

export const renderRanking = async (_req: Request, res: Response) => {
  const ranking = await getTopRanking();
  res.render('ranking', { ranking });
};
