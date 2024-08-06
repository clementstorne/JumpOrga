"use server";

import { DbOfficial, DbUser } from "@/types";
import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserData = async (
  id: string,
  data: Pick<DbUser, "firstname" | "lastname" | "email">
) => {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath("/dashboard");
};

export const updateProfile = async (
  id: string,
  data: Omit<DbOfficial, "id" | "userId">
) => {
  const transformedData = {
    ...data,
    judgeLevel: data.judgeLevel || null,
    courseDesignerLevel: data.courseDesignerLevel || null,
    stewardLevel: data.stewardLevel || null,
  };
  await prisma.official.update({
    where: {
      id,
    },
    data: transformedData,
  });
  revalidatePath("/dashboard");
};
