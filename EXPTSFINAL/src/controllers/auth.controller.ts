import { Request, Response } from 'express';
import { findUserByEmail } from '../services/user.service';
import bcrypt from 'bcryptjs';

export const renderLogin = (_req: Request, res: Response) => {
  res.render('auth/login');
};

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Credenciais inválidas');
  }

  req.session.uid = user.id;
  res.redirect('/');
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Erro ao sair');
    res.redirect('/login');
  });
};
