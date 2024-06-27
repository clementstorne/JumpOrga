"use server";

import prisma from "@lib/prisma";

export const getEvents = async () => {
  return await prisma.event.findMany({
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
};
