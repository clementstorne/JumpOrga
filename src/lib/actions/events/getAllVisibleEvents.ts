"use server";

import { dateToStringDate } from "@lib/dateUtils";
import prisma from "@lib/prisma";

export const getAllVisibleEvents = async () => {
  const todayDate = new Date();
  const today = dateToStringDate(todayDate);

  return await prisma.event.findMany({
    where: {
      isVisible: true,
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
