import { Request, Response } from 'express';
import {
  createMajor,
  getAllMajors,
  getMajorById,
  updateMajor,
  deleteMajor
} from '../services/major.service';

export const renderCreateForm = (_req: Request, res: Response) => {
  res.render('major/create');
};

export const handleCreateMajor = async (req: Request, res: Response) => {
  console.log('[DEBUG] Dados recebidos em /major/create:', req.body);

  const { name, code, description } = req.body;
  if (!name || !code || !description) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  await createMajor({ name, code, description });
  res.redirect('/major');
};

export const renderMajorList = async (_req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('major/list', { majors });
};

export const renderEditForm = async (req: Request, res: Response) => {
  const major = await getMajorById(req.params.id);
  res.render('major/edit', { major });
};

export const handleEditMajor = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  if (!name || !code || !description) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  await updateMajor(req.params.id, { name, code, description });
  res.redirect('/major');
};

export const handleDeleteMajor = async (req: Request, res: Response) => {
  try {
    await deleteMajor(req.params.id);

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.sendStatus(200);
    }

    res.redirect('/major');
  } catch (err) {
    res.status(500).send('Erro ao excluir curso.');
  }
};
