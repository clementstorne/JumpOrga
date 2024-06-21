"use server";

import ResetPasswordEmailTemplate from "@components/email-templates/ResetPasswordEmailTemplate";
import prisma from "@lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

export const resetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiry: expiryDate,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "JumpOrga <contact@clementstorne.dev>",
    to: [email],
    subject: "Réinitialisation de mot de passe",
    react: ResetPasswordEmailTemplate({
      email,
      resetPasswordToken,
    }) as React.ReactElement,
  });

  return "Password reset email sent";
};
