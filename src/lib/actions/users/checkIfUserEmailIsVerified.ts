"use server";

import prisma from "@lib/prisma";

export const checkIfUserEmailIsVerified = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("Cet utilisateur n'existe pas");
  }

  if (user.emailVerified) {
    return true;
  } else {
    return false;
  }
};
