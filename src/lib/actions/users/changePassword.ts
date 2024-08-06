"use server";

import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const changePassword = async (
  resetPasswordToken: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken: resetPasswordToken,
    },
    select: {
      id: true,
      resetPasswordTokenExpiry: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  if (!resetPasswordTokenExpiry) {
    throw new Error("No Token expiry date");
  }

  const today = new Date();

  if (today > resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });
  redirect("/login");
};
