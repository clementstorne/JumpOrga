"use client";

import { DbEventApplication } from "@/types";
import ApplicationStatusTag from "@components/ApplicationStatusTag";
import { formatEventDates } from "@lib/dateUtils";
import { roleTranslations } from "@lib/translations";
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
        "h-fill flex flex-col items-center justify-between gap-4",
        "hover:bg-background"
      )}
    >
      <div className="w-full flex flex-col items-center">
        <h3>{event.place}</h3>
        <p className="font-bold">{formatEventDates(event.start, event.end)}</p>
        <p>{roleTranslations[appliedRole]}</p>
      </div>

      <ApplicationStatusTag status={status} />
    </div>
  );
};
export default ApplicationCard;
