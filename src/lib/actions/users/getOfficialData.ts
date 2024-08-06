import prisma from "@lib/prisma";

export const getOfficialData = async (userId: string) => {
  const official = await prisma.official.findUnique({
    where: {
      userId: userId,
    },
  });
  return official;
};
