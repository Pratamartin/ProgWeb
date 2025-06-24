import { Request, Response } from 'express';
import {
  createMajor,
  getAllMajors,
  getMajor,
  updateMajor,
  removeMajor,
} from '../services/major';

const index = async (req: Request, res: Response) => {
  const majors = await getAllMajors();
  res.render('major/index', { majors });
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('major/create');
  } else {
    try {
      await createMajor(req.body);
      res.redirect('/major');
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const major = await getMajor(req.params.id);
  res.render('major/read', { major });
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.method === 'GET') {
    const major = await getMajor(id);
    res.render('major/update', { major });
  } else {
    try {
      await updateMajor(id, req.body);
      res.redirect('/major');
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await removeMajor(req.params.id);
    res.redirect('/major');
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { index, create, read, update, remove };
