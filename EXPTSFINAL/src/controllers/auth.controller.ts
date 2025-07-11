import { Request, Response } from 'express';
import { authenticateUser } from '../services/auth.service';

export const renderLogin = (_req: Request, res: Response) => {
  res.render('auth/login');
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);

  if (!user) {
    return res.status(401).send('Credenciais inválidas');
  }

  req.session.uid = user.id;
  res.redirect('/welcome');
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Erro ao sair');
    res.redirect('/login');
  });
};
