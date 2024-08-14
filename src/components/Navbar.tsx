"use client";

import { NavbarLink, SessionUser } from "@/types";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VISITOR_LINKS: NavbarLink[] = [
  {
    href: "/",
    label: "Accueil",
  },
];

const USER_LINKS: NavbarLink[] = [
  {
    href: "/dashboard",
    label: "Accueil",
  },
  {
    href: "/dashboard/profile",
    label: "Mon profil",
  },
];

const ORGANIZER_LINKS: NavbarLink[] = [
  {
    href: "/dashboard/events/create-new-event",
    label: "Créer un concours",
  },
  {
    href: "/dashboard/events/future-events",
    label: "Mes concours à venir",
  },
  {
    href: "/dashboard/events/past-events",
    label: "Mes concours passés",
  },
];

const OFFICIAL_LINKS: NavbarLink[] = [
  {
    href: "/dashboard/events/find-events",
    label: "Trouver des concours",
  },
  {
    href: "/dashboard/applications/my-applications",
    label: "Mes candidatures",
  },
];

type BurgerButtonProps = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({ className, isOpen, onClick }: BurgerButtonProps) => {
  return (
    <Button
      variant="none"
      size="icon"
      className={cn("p-0", className)}
      aria-label="Ouvrir le menu"
      onClick={onClick}
    >
      {isOpen ? <X size={32} /> : <Menu size={32} />}
    </Button>
  );
};

const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Link href="/login" className={cn("link", "flex items-center gap-2")}>
        <LogIn /> Se connecter
      </Link>
    );
  } else {
    return (
      <Button
        variant="link"
        className={cn(
          "link",
          "p-0 rounded-none h-7",
          "flex items-center gap-2"
        )}
        onClick={() => {
          signOut();
          router.push("/login");
        }}
      >
        <LogOut />
        <span>Se déconnecter</span>
      </Button>
    );
  }
};

const Navbar = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();

  const user = session?.user as SessionUser;

  const baseLinks = !session && !user ? VISITOR_LINKS : USER_LINKS;

  const additionnalLinks = !user
    ? []
    : user.role === "organizer"
    ? ORGANIZER_LINKS
    : OFFICIAL_LINKS;

  const allLinks = baseLinks.concat(additionnalLinks);

  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 w-screen z-10 bg-background shadow-md",
        "flex items-center justify-between",
        "h-20 py-2 px-8",
        "lg:h-24 lg:py-4",
        "animate-none"
      )}
    >
      <Link
        href={!session ? "/" : "/dashboard"}
        className="h-full flex items-center space-x-2"
      >
        <Image
          className="h-full w-auto"
          src="/JumpOrga.svg"
          alt="Logo de JumpOrga"
          width={143}
          height={204.15}
          priority
        />{" "}
        <span className="text-3xl font-black text-primary">JumpOrga</span>
      </Link>

      <BurgerButton isOpen={isOpen} onClick={handleDrawer} />

      <nav
        className={cn(
          "fixed top-24 lg:top-32 left-0 right-0 h-full overflow-auto bg-casablanca-50",
          "flex flex-col justify-start items-center space-y-8 py-8",
          "transform ease-in-out transition-all duration-300",
          isOpen && "translate-x-0",
          !isOpen && "-translate-x-full"
        )}
      >
        {allLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn("link", currentPath === link.href && "border-minsk")}
          >
            {link.label}
          </Link>
        ))}
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Navbar;
