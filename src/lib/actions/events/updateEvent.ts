"use server";

import { DbEvent } from "@/types";
import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const updateEvent = async (id: string, data: Omit<DbEvent, "id">) => {
  await prisma.event.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath("/dashboard");
};
