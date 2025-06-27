import { Request, Response } from 'express';
import {
  createMajor,
  getAllMajors,
  getMajorById,
  updateMajor,
  deleteMajor
} from '../services/major.service';
import { majorSchema } from '../types/major.types';

// Renderiza o formulário de criação
export const renderCreateForm = (_req: Request, res: Response) => {
  res.render('major/create');
};

// Processa o POST de criação
export const handleCreateMajor = async (req: Request, res: Response) => {
  console.log('[DEBUG] Dados recebidos em /major/create:', req.body);

  const { error, value } = majorSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`Erro de validação: ${error.message}`);
  }

  await createMajor(value);
  res.redirect('/major'); // Redireciona para a listagem após criar
};

// Lista todos os majors
export const renderMajorList = async (_req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('major/list', { majors });
};

// Renderiza formulário de edição
export const renderEditForm = async (req: Request, res: Response) => {
  const major = await getMajorById(req.params.id);
  res.render('major/edit', { major });
};

// Processa a edição
export const handleEditMajor = async (req: Request, res: Response) => {
  const { error, value } = majorSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  await updateMajor(req.params.id, value);
  res.redirect('/major');
};

// Processa a exclusão
export const handleDeleteMajor = async (req: Request, res: Response) => {
  await deleteMajor(req.params.id);
  res.redirect('/major');
};
