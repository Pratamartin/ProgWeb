import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllMajors
} from '../services/user.service';
import { userSchema } from '../types/user.types';

export const renderCreateUserForm = async (_req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('user/create', { majors });
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  await createUser(value);
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
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  await updateUser(req.params.id, value);
  res.redirect('/user');
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  await deleteUser(req.params.id);
  res.redirect('/user');
};
