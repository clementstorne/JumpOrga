"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getAllPastEvents = async (userId: string) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      ownerId: userId,
      end: {
        lt: today,
      },
    },
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
};
