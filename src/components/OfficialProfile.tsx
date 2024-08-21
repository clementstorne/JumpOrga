import { cn } from "@/lib/utils";
import { levelTranslations } from "@lib/translations";
import { buttonVariants } from "@ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

type OfficialProfileProps = {
  user: {
    firstname: string;
    lastname: string;
    email: string;
  };
  level: string;
};
const OfficialProfile = ({ user, level }: OfficialProfileProps) => {
  return (
    <>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      {level.length > 0 ? (
        <h4 className="font-normal">{levelTranslations[level]}</h4>
      ) : null}

      <Link
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-full flex items-center justify-center gap-2"
        )}
        href={`mailto:${user.email}`}
      >
        <Mail />
        <span>Envoyer un email</span>
      </Link>
    </>
  );
};

export default OfficialProfile;
