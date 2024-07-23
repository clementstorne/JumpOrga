import prisma from "@lib/prisma";

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
      organizer: {
        select: {
          id: true,
        },
      },
      official: {
        select: {
          id: true,
        },
      },
    },
  });
  return user;
};
