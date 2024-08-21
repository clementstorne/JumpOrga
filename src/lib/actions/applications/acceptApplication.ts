"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const acceptApplication = async (id: string) => {
  const existingApplication = await prisma.eventApplication.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingApplication) {
    throw new Error("Cette candidature n'existe pas");
  }

  await prisma.eventApplication.update({
    where: {
      id: existingApplication.id,
    },
    data: {
      status: "accepted",
    },
  });

  if (existingApplication.appliedRole === "judge") {
    await prisma.event.update({
      where: {
        id: existingApplication.eventId,
      },
      data: {
        hasJudge: true,
      },
    });
    await prisma.eventApplication.updateMany({
      where: {
        eventId: existingApplication.eventId,
        appliedRole: "judge",
      },
      data: {
        status: "rejected",
      },
    });
  } else if (existingApplication.appliedRole === "steward") {
    await prisma.event.update({
      where: {
        id: existingApplication.eventId,
      },
      data: {
        hasSteward: true,
      },
    });
    await prisma.eventApplication.updateMany({
      where: {
        eventId: existingApplication.eventId,
        appliedRole: "steward",
      },
      data: {
        status: "rejected",
      },
    });
  } else if (existingApplication.appliedRole === "courseDesigner") {
    await prisma.event.update({
      where: {
        id: existingApplication.eventId,
      },
      data: {
        hasCourseDesigner: true,
      },
    });
    await prisma.eventApplication.updateMany({
      where: {
        eventId: existingApplication.eventId,
        appliedRole: "courseDesigner",
      },
      data: {
        status: "rejected",
      },
    });
  } else if (existingApplication.appliedRole === "timeKeeper") {
    await prisma.event.update({
      where: {
        id: existingApplication.eventId,
      },
      data: {
        hasTimeKeeper: true,
      },
    });
    await prisma.eventApplication.updateMany({
      where: {
        eventId: existingApplication.eventId,
        appliedRole: "timeKeeper",
      },
      data: {
        status: "rejected",
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard/applications");
};
