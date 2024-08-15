"use server";

import prisma from "@lib/prisma";

export const getSingleEventWithApplications = async (id: string) => {
  return await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      applications: {
        select: {
          id: true,
          eventId: true,
          appliedRole: true,
          status: true,
          official: {
            select: {
              judgeLevel: true,
              courseDesignerLevel: true,
              stewardLevel: true,
              user: {
                select: {
                  firstname: true,
                  lastname: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
