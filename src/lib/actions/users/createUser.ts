"use server";

import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  role,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "official" | "organizer";
}) => {
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hash,
      firstname,
      lastname,
      role,
    },
  });
  redirect("/login");
};
