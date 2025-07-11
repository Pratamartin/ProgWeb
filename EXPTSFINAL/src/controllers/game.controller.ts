import { Request, Response } from 'express';
import { saveScore } from '../services/game.service';

export const handleSaveScore = async (req: Request, res: Response) => {
  const { score } = req.body;
  const userId = req.session.uid;

  if (!userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    await saveScore(userId, Number(score));
    res.status(201).json({ message: 'Pontuação salva' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar pontuação' });
  }
};
