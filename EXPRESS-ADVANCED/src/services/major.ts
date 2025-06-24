import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major';

const prisma = new PrismaClient();

export const getAllMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
};

export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } });
};

export const createMajor = async (data: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data });
};

export const updateMajor = async (
  id: string,
  data: UpdateMajorDto
): Promise<Major> => {
  return prisma.major.update({ where: { id }, data });
};

export const removeMajor = async (id: string): Promise<Major> => {
  return prisma.major.delete({ where: { id } });
};
