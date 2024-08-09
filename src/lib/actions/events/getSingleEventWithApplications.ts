"use server";

import prisma from "@lib/prisma";

export const getSingleEventWithApplications = async (id: string) => {
  return await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      applications: true,
    },
  });
};
