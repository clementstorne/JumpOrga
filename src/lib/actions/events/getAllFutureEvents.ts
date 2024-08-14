"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getAllFutureEvents = async (organizerId: string) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      ownerId: organizerId,
      end: {
        gte: today,
      },
    },
    include: {
      applications: true,
    },
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
};
