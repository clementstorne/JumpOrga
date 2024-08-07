"use server";

import VerifyEmailTemplate from "@components/email-templates/VerifyEmailTemplate";
import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export const signUp = async ({
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
  try {
    const hash = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        firstname,
        lastname,
        role,
      },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await prisma.user.update({
      where: {
        id: createdUser.id,
      },
      data: {
        emailVerificationToken: emailVerificationToken,
      },
    });

    if (role === "organizer") {
      await prisma.organizer.create({
        data: {
          userId: createdUser.id,
        },
      });
    } else if (role === "official") {
      await prisma.official.create({
        data: {
          userId: createdUser.id,
        },
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "JumpOrga <contact@clementstorne.dev>",
      to: [email],
      subject: "Vérification de l'adresse email",
      react: VerifyEmailTemplate({
        email,
        emailVerificationToken,
      }) as React.ReactElement,
    });

    redirect("/login");
  } catch (error) {
    console.error("Error during sign up:", error);
    throw new Error("Sign up failed. Please try again later.");
  }
};
