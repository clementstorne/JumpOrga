import { DbEventApplication } from "@/types";
import { statusTranslations } from "@lib/translations";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";

type ApplicationStatusTagProps = Pick<DbEventApplication, "status">;

const ApplicationStatusTag = ({ status }: ApplicationStatusTagProps) => {
  return (
    <p
      className={cn(
        status === "rejected" &&
          buttonVariants({ variant: "destructive", size: "xs" }),
        status === "pending" &&
          buttonVariants({ variant: "warning", size: "xs" }),
        status === "accepted" &&
          buttonVariants({ variant: "success", size: "xs" }),
        "px-8 my-4"
      )}
    >
      {statusTranslations[status]}
    </p>
  );
};

export default ApplicationStatusTag;
