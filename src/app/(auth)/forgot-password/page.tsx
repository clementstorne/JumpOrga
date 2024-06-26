import LoginForm from "@components/ForgotPasswordForm";
import { cn } from "@lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JumpOrga - Réinitialisation du mot de passe",
  description:
    "Réinitialisez votre mot de passe pour accéder à votre compte JumpOrga et continuer à organiser et gérer vos événements de saut d'obstacles. Accédez à toutes les fonctionnalités en un seul clic.",
};

const ForgotPasswordPage = () => {
  return <LoginForm className={cn("lg:col-span-3")} />;
};

export default ForgotPasswordPage;
