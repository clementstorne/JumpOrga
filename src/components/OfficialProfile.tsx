import { getOfficialProfile } from "@/lib/actions/users/getOfficialProfil";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type OfficialProfileProps = {
  officialId: string;
};
const OfficialProfile = async ({ officialId }: OfficialProfileProps) => {
  const official = await getOfficialProfile(officialId);

  return (
    <>
      <h3>
        {official.firstname} {official.lastname}
      </h3>
      <Link
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-full flex items-center justify-center gap-2"
        )}
        href={`mailto:${official.email}`}
      >
        <Mail />
        <span>Envoyer un email</span>
      </Link>
    </>
  );
};

export default OfficialProfile;
