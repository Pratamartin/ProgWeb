import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const saveScore = async (userId: string, score: number) => {
  return prisma.gameSession.create({
    data: {
      user_id: userId,
      score
    }
  });
};

export const getTopRanking = async (limit = 10) => {
  const top = await prisma.gameSession.findMany({
    orderBy: { score: 'desc' },
    take: limit,
    include: { user: true }
  });

  return top.map(gs => ({
    name: gs.user.fullname,
    score: gs.score
  }));
};
