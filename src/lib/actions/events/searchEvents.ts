"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

type searchEventsArgs = {
  start?: string;
  end?: string;
  place?: string;
  level?: string;
};

export const searchEvents = async ({
  start,
  end,
  place,
  level,
}: searchEventsArgs) => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      isVisible: true,
      end: end ? { gte: today, lte: end } : { gte: today },
      start: start ? { gte: start } : undefined,
      place: place ? { contains: place } : undefined,
      level: level ? { contains: level } : undefined,
    },
    orderBy: [
      {
        start: "asc",
      },
    ],
  });
};
