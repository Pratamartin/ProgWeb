import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from '../types/user.types';

const prisma = new PrismaClient();

export const createUser = async (data: CreateUserInput) => {
  return prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({ include: { major: true } });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: string, data: CreateUserInput) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const getAllMajors = async () => {
  return prisma.major.findMany();
};
