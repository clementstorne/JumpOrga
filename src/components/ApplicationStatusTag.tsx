import { DbEventApplication } from "@/types";
import { statusTranslations } from "@lib/translations";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";

type ApplicationStatusTagProps = Pick<DbEventApplication, "status">;

const ApplicationStatusTag = ({ status }: ApplicationStatusTagProps) => {
  return (
    <p
      className={cn(
        status === "rejected" && buttonVariants({ variant: "destructive" }),
        status === "pending" && buttonVariants({ variant: "warning" }),
        status === "accepted" && buttonVariants({ variant: "success" }),
        "w-full mt-4"
      )}
    >
      {statusTranslations[status]}
    </p>
  );
};

export default ApplicationStatusTag;
