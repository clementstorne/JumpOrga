"use server";

import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const changePassword = async (
  resetPasswordToken: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken: resetPasswordToken,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      resetPasswordToken: resetPasswordToken,
    },
    data: {
      password: hash,
    },
  });
  redirect("/login");
};
