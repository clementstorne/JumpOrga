"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteEvent = async (id: string) => {
  await prisma.event.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard");
};
