import { PrismaClient } from '@prisma/client';
import { CreateMajorInput } from '../types/major.types';

const prisma = new PrismaClient();

export const createMajor = async (data: CreateMajorInput) => {
  return await prisma.major.create({ data });
};

export const getAllMajors = async () => {
  return await prisma.major.findMany();
};

export const getMajorById = async (id: string) => {
  return await prisma.major.findUnique({ where: { id } });
};

export const updateMajor = async (id: string, data: CreateMajorInput) => {
  return await prisma.major.update({ where: { id }, data });
};

export const deleteMajor = async (id: string) => {
  return await prisma.major.delete({ where: { id } });
};
