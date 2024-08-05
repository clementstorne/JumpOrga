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
        buttonVariants({ variant: "outline" }),
        "h-full relative flex flex-col items-center justify-start",
        "hover:bg-background"
      )}
    >
      <p className="text-lg">
        {event.place} •{" "}
        <span className="font-normal">
          {formatEventDates(event.start, event.end)}
        </span>
      </p>
      <p>{roleTranslations[appliedRole]}</p>
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
