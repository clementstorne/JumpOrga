import prisma from "./prisma";

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
    },
  });
  return user;
};
