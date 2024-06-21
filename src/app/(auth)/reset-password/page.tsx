import ResetPasswordForm from "@components/ResetPasswordForm";
import prisma from "@lib/prisma";
import { cn } from "@lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "JumpOrga - Créer un compte",
  description:
    "Rejoignez JumpOrga et commencez à organiser vos événements de saut d'obstacles dès aujourd'hui. Créez un compte gratuitement et accédez à toutes nos fonctionnalités.",
};

type ResetPasswordPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const resetPasswordToken = searchParams.token as string;
    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: resetPasswordToken,
      },
    });

    if (!user) {
      redirect("/forgot-password");
      return;
    }

    return (
      <ResetPasswordForm
        resetPasswordToken={resetPasswordToken}
        className={cn("lg:col-span-3 lg:px-20")}
      />
    );
  } else {
    redirect("/forgot-password");
  }
};

export default ResetPasswordPage;
