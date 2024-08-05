"use server";

import prisma from "@lib/prisma";
import { roleTranslations } from "@lib/translations";
import { OfficialRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const applyForEvent = async (
  eventId: string,
  officialId: string,
  appliedRole: OfficialRole
) => {
  const existingApplication = await prisma.eventApplication.findFirst({
    where: {
      eventId: eventId,
      officialId: officialId,
      appliedRole: appliedRole,
    },
  });

  if (existingApplication) {
    throw new Error(
      `Vous avez déjà postulé pour ce concours en tant que ${roleTranslations[appliedRole]}.`
    );
  }

  await prisma.eventApplication.create({
    data: {
      eventId: eventId,
      officialId: officialId,
      appliedRole: appliedRole,
      status: "pending",
    },
  });
  revalidatePath("/dashboard/events/find-event");
};
