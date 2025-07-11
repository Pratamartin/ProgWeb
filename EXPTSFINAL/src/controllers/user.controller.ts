import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllMajors
} from '../services/user.service';
import { changePassword } from '../services/auth.service';


export const renderCreateUserForm = async (_req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('user/create', { majors });
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const { fullname, email, password, confirmPassword, major_id } = req.body;

  if (!fullname || !email || !password || !confirmPassword || !major_id) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('As senhas não coincidem.');
  }

  await createUser({ fullname, email, password, major_id });
  res.redirect('/user');
};

export const renderUserList = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.render('user/list', { users });
};

export const renderEditUserForm = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  const majors = await getAllMajors();
  res.render('user/edit', { user, majors });
};

export const handleEditUser = async (req: Request, res: Response) => {
  const { fullname, email, password, major_id } = req.body;
  if (!fullname || !email || !password || !major_id) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  await updateUser(req.params.id, { fullname, email, password, major_id });
  res.redirect('/user');
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUser(req.params.id);

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.sendStatus(200);
    }

    res.redirect('/user');
  } catch (err) {
    res.status(500).send('Erro ao excluir usuário.');
  }
};


export const renderChangePassword = (req: Request, res: Response) => {
  if (!req.session.uid) return res.redirect('/login');
  res.render('user/change-password');
};

export const handleChangePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.session.uid;

  if (!userId) return res.status(401).send('Não autenticado');

  if (newPassword !== confirmNewPassword) {
    return res.status(400).send('As novas senhas não coincidem');
  }

  const success = await changePassword(userId, currentPassword, newPassword);

  if (!success) {
    return res.status(400).send('Senha atual incorreta');
  }

  res.redirect('/');
}


export const renderEditProfile = async (req: Request, res: Response) => {
  const userId = req.session.uid;
  if (!userId) return res.redirect('/login');

  const user = await getUserById(userId);
  const majors = await getAllMajors();

  res.render('user/edit-profile', { user, majors });
};

export const handleEditProfile = async (req: Request, res: Response) => {
  const userId = req.session.uid;
  if (!userId) return res.redirect('/login');

  const { fullname, email, major_id } = req.body;

  if (!fullname || !email || !major_id) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  await updateUser(userId, { fullname, email, major_id });
  res.redirect('/');
};
