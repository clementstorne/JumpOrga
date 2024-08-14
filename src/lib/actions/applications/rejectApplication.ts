"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const rejetApplication = async (id: string) => {
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
      status: "rejected",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard/applications");
};
