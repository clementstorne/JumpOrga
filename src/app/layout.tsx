import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JumpOrga - Trouvez des Officiels de Compétition",
  description:
    "JumpOrga est une application web permettant aux organisateurs de concours de saut d'obstacles de trouver et d'engager facilement des officiels de compétition qualifiés pour leurs événements. Facilitez l'organisation de vos concours avec notre plateforme intuitive et nos outils de planification efficaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
