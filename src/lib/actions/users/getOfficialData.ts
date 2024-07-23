import prisma from "@lib/prisma";

export const getOfficialData = async (officialId: string) => {
  const official = await prisma.official.findUnique({
    where: {
      id: officialId,
    },
  });
  return official;
};
