"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getAllPastEvents = async (organizerId: string) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      ownerId: organizerId,
      end: {
        lt: today,
      },
    },
    include: {
      applications: true,
    },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });
};
