"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const changeVisibility = async (id: string, isVisible: boolean) => {
  await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      isVisible: isVisible,
    },
  });
  revalidatePath("/dashboard");
};
