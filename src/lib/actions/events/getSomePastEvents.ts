"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getSomePastEvents = async (
  organizerId: string,
  numberOfEvents: number
) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    take: numberOfEvents,
    where: {
      ownerId: organizerId,
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
