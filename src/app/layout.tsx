import Providers from "@/app/provider";
import Navbar from "@components/Navbar";
import { cn } from "@lib/utils";
import { Toaster } from "@ui/toaster";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JumpOrga - Trouvez des Officiels de Compétition",
  description:
    "JumpOrga est une application web permettant aux organisateurs de concours de saut d'obstacles de trouver et d'engager facilement des officiels de compétition qualifiés pour leurs événements. Facilitez l'organisation de vos concours avec notre plateforme intuitive et nos outils de planification efficaces.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fr">
      <body className={nunito.className}>
        <Providers>
          <Navbar />
          <main
            className={cn(
              "min-h-lvh p-4 pt-24 bg-casablanca-50",
              "md:p-8 md:pt-24",
              "lg:pt-28"
            )}
          >
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
