import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/button";
import { CalendarRange, FilePen, ListTodo } from "lucide-react";
import Link from "next/link";

const FunctionalityCard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-minsk bg-minsk-50/20  text-card-foreground shadow-lg",
        "px-4 py-8",
        "flex flex-col items-center gap-4 text-center",
        "hover:bg-minsk-50/30 hover:shadow-xl"
      )}
    >
      {children}
    </div>
  );
};

const Icon = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-16 h-16 p-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default async function HomePage() {
  return (
    <>
      <section
        className={cn(
          "w-full min-h-dvh p-4 lg:p-32 top-20 lg:top-24",
          "bg-hero bg-center bg-cover",
          "flex flex-col items-center justify-center gap-16 text-center"
        )}
      >
        <h1 className="text-4xl md:text-6xl">
          La plateforme pour trouver des officiels pour vos concours de saut
          d&apos;obstacles
        </h1>
        <div
          className={cn(
            "flex flex-col gap-8",
            "md:grid md:grid-cols-2 md:gap-16"
          )}
        >
          <Link
            href={"/login"}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "md:buttonVariants({ variant: 'default', size: 'xl' })"
            )}
          >
            Je suis organisateur
          </Link>
          <Link
            href={"/login"}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "md:buttonVariants({ variant: 'default', size: 'xl' })"
            )}
          >
            Je suis officiel
          </Link>
        </div>
      </section>
      <section
        className={cn(
          "w-full p-4 lg:p-8 my-16",
          "flex flex-col gap-8",
          "md:grid md:grid-cols-3 lg:gap-16"
        )}
      >
        <FunctionalityCard>
          <h2>Gestion des événements</h2>
          <Icon>
            <CalendarRange className="w-full h-full" />
          </Icon>
          <p>
            Gérez vos concours de saut d&apos;obstacles en toute simplicité.
            Planifiez, organisez et suivez chaque détail de vos événements
            directement depuis notre plateforme, avec une interface intuitive.
          </p>
        </FunctionalityCard>

        <FunctionalityCard>
          <h2>Candidatures simplifiées</h2>
          <Icon>
            <FilePen className="w-full h-full" />
          </Icon>
          <p>
            Facilitez le processus de candidature pour vos officiels. Avec
            JumpOrga, les officiels peuvent postuler rapidement aux concours qui
            correspondent à leurs compétences, sans tracas.
          </p>
        </FunctionalityCard>

        <FunctionalityCard>
          <h2>Suivi des candidatures</h2>
          <Icon>
            <ListTodo className="w-full h-full" />
          </Icon>
          <p>
            Gardez un œil sur l&apos;état des candidatures. Suivez en temps réel
            qui a postulé pour vos concours, et gérez les candidatures avec des
            outils efficaces pour sélectionner les meilleurs profils.
          </p>
        </FunctionalityCard>
      </section>
    </>
  );
}
