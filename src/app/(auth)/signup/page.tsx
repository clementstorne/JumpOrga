import { cn } from "@/lib/utils";
import { Metadata } from "next";
import SignupForm from "./form";

export const metadata: Metadata = {
  title: "JumpOrga - Créer un compte",
  description:
    "Rejoignez JumpOrga et commencez à organiser vos événements de saut d'obstacles dès aujourd'hui. Créez un compte gratuitement et accédez à toutes nos fonctionnalités.",
};

const Page = () => {
  return <SignupForm className={cn("lg:col-span-3 lg:px-20")} />;
};

export default Page;
