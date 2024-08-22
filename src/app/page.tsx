import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <section
        className={cn(
          "w-full min-h-dvh absolute left-0 right-0 p-4 lg:p-32 top-20 lg:top-24",
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
    </>
  );
}
