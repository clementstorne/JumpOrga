"use server";

import prisma from "@lib/prisma";

export const checkIfUserExists = async (email: string) => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    return true;
  } else {
    return false;
  }
};
