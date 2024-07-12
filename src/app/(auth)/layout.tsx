import { cn } from "@lib/utils";
import { Card, CardContent } from "@ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "intraconnect - Connectez-vous",
  description:
    "Connectez-vous à IntraConnect, le réseau social interne d'entreprise, pour accéder à un espace de collaboration dynamique. Créez un compte en quelques étapes simples et rejoignez une communauté d'employés engagés. Rejoignez-nous dès aujourd'hui pour rester connecté et productif au sein de votre organisation.",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Card>
        <CardContent
          className={cn(
            "w-full min-h-[calc(100svh-10rem)] overflow-hidden !p-0",
            "md:grid md:grid-cols-2 md:items-center",
            "lg:grid-cols-5"
          )}
        >
          {children}
          <div
            className={cn(
              "hidden bg-auth bg-cover bg-[position:25%_50%] rounded-tr-lg rounded-br-lg",
              "md:block md:w-full md:h-full md:object-right md:object-cover",
              "lg:col-span-2"
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default layout;
