"use server";

import prisma from "@/lib/prisma";
import { DbEvent } from "@/types";

export const createEvent = async (data: Omit<DbEvent, "id">) => {
  await prisma.event.create({
    data: { ...data },
  });
};
