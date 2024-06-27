import { buttonVariants } from "@components/ui/button";
import prisma from "@lib/prisma";
import { cn } from "@lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "JumpOrga - Vérification de l'email",
  description:
    "Rejoignez JumpOrga et commencez à organiser vos événements de saut d'obstacles dès aujourd'hui. Créez un compte gratuitement et accédez à toutes nos fonctionnalités.",
};

type VerifyEmailPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const emailVerificationToken = searchParams.token as string;
    const user = await prisma.user.findUnique({
      where: {
        emailVerificationToken: emailVerificationToken,
      },
    });

    if (!user) {
      redirect("/signup");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return (
      <div className={cn("lg:col-span-3 lg:px-20")}>
        <div
          className={cn("min-w-full text-center space-y-2", "md:text-justify")}
        >
          <h1 className="md:text-left">Email vérifié avec succès</h1>
          <p className=" text-foreground">
            Votre adresse email a été vérifiée avec succès. Vous pouvez
            maintenant vous connecter à votre compte.
          </p>
        </div>

        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "default" }), "w-full mt-14")}
        >
          Aller à la page de connexion
        </Link>
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default VerifyEmailPage;
