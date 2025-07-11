import bcrypt from 'bcryptjs';
import { CreateUserInput } from '../types/user.types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: CreateUserInput) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  return prisma.user.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      password: hashedPassword,
      major_id: data.major_id,
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({ include: { major: true } });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id }, include: { major: true } });
};

export const updateUser = async (id: string, data: Partial<CreateUserInput>) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const getAllMajors = async () => {
  return prisma.major.findMany();
};
