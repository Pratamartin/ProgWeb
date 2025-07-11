import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllMajors
} from '../services/user.service';

export const renderCreateUserForm = async (_req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('user/create', { majors });
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const { fullname, email, password, major_id } = req.body;
  if (!fullname || !email || !password || !major_id) {
    return res.status(400).send('Todos os campos são obrigatórios.');
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
  await deleteUser(req.params.id);
  res.redirect('/user');
};
