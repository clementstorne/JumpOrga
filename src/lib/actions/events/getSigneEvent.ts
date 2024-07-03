"use server";

import prisma from "@lib/prisma";

export const getSingleEvent = async (id: string) => {
  return await prisma.event.findUnique({
    where: {
      id,
    },
  });
};
