"use server";

import { DbEvent } from "@/types";
import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const createEvent = async (data: Omit<DbEvent, "id">) => {
  await prisma.event.create({
    data: { ...data },
  });
  revalidatePath("/dashboard");
};
