"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getThreePastEvents = async (userId: string) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    take: 3,
    where: {
      ownerId: userId,
      end: {
        lt: today,
      },
    },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });
};
