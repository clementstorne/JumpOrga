"use client";

import { DbEventApplication } from "@/types";
import { buttonVariants } from "@components/ui/button";
import { formatEventDates } from "@lib/dateUtils";
import { roleTranslations, statusTranslations } from "@lib/translations";
import { cn } from "@lib/utils";

type ApplicationCardProps = Pick<
  DbEventApplication,
  "appliedRole" | "status" | "event"
>;

const ApplicationCard = ({
  appliedRole,
  status,
  event,
}: ApplicationCardProps) => {
  return (
    <div
      className={cn(
        "p-4 flex items-center justify-center rounded-md border-2 border-input bg-background",
        "h-fill flex flex-col items-start justify-between gap-4",
        "hover:bg-background"
      )}
    >
      <div className="w-full flex flex-col items-center">
        <h3>{event.place}</h3>
        <p className="font-bold">{formatEventDates(event.start, event.end)}</p>
        <p>{roleTranslations[appliedRole]}</p>
      </div>

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
    </div>
  );
};
export default ApplicationCard;
