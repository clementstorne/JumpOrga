import LoginForm from "@components/LoginForm";
import { cn } from "@lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JumpOrga - Connexion",
  description:
    "Connectez-vous à votre compte JumpOrga pour organiser et gérer vos événements de saut d'obstacles. Accédez à toutes les fonctionnalités en un seul clic.",
};

const LoginPage = () => {
  return <LoginForm className={cn("lg:col-span-3")} />;
};

export default LoginPage;
