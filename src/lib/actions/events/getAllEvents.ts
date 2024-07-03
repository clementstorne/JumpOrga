"use server";

import prisma from "@lib/prisma";

export const getAllEvents = async (userId: string) => {
  return await prisma.event.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
};
