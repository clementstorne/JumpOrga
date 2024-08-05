"use server";

import prisma from "@lib/prisma";

export const getAllApplications = async (officialId: string) => {
  return await prisma.eventApplication.findMany({
    where: {
      officialId: officialId,
    },
    include: {
      event: true,
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
};
