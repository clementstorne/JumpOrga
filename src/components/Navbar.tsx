"use client";

import { LINKS } from "@lib/const";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BurgerButtonProps = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const BurgerButton = ({ className, isOpen, onClick }: BurgerButtonProps) => {
  return (
    <Button
      variant={"link"}
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
      <Link href="/login" className="link">
        Se connecter
      </Link>
    );
  } else {
    return (
      <Button
        variant="link"
        className="p-0 rounded-none h-7 text-lg"
        onClick={() => {
          signOut();
          router.push("/login");
        }}
      >
        Se déconnecter
      </Button>
    );
  }
};

const Navbar = () => {
  const currentPath = usePathname();

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
        "h-20 py-2 px-5",
        "lg:h-24 lg:py-4 lg:px-14",
        "animate-none"
      )}
    >
      <BurgerButton
        className="md:hidden absolute right-5 top-6"
        isOpen={isOpen}
        onClick={handleDrawer}
      />

      <Link href="/" className="h-full flex items-center space-x-2">
        <Image
          className="h-full w-auto"
          src="/JumpOrga.svg"
          alt="JumpOrga"
          width={143}
          height={204.15}
          priority
        />{" "}
        <span className="text-3xl font-black text-primary">JumpOrga</span>
      </Link>

      <nav
        className={cn(
          "h-6 py-2",
          "flex space-x-8 items-center justify-center",
          "max-md:hidden"
        )}
      >
        {LINKS.map((link, index) => (
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

      <nav
        data-testid="drawer"
        className={cn(
          "fixed top-20 left-0 right-0 h-full bg-slate-50 overflow-auto bg-background",
          "flex flex-col justify-start items-center space-y-8 py-8",
          "transform ease-in-out transition-all duration-300",
          isOpen && "translate-x-0",
          !isOpen && "-translate-x-full"
        )}
      >
        {LINKS.map((link, index) => (
          <Link key={index} href={link.href} className="link">
            {link.label}
          </Link>
        ))}
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Navbar;
