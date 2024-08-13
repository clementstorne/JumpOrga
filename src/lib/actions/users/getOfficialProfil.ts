import prisma from "@lib/prisma";

export const getOfficialProfile = async (id: string) => {
  const official = await prisma.official.findUnique({
    where: {
      id: id,
    },
    select: {
      user: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
        },
      },
    },
  });

  if (!official) {
    throw new Error("Cet officiel n'existe pas");
  }

  return official.user;
};
