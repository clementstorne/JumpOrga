"use client";

import { DbEventApplication } from "@/types";
import ApplicationStatusTag from "@components/ApplicationStatusTag";
import { cn } from "@lib/utils";
import ApplicationButtons from "./ApplicationButtons";
import OfficialProfile from "./OfficialProfile";

type ApplicationToReviewCardProps = Omit<DbEventApplication, "event">;

const ApplicationToReviewCard = ({
  id,
  eventId,
  officialId,
  appliedRole,
  status,
  createdAt,
  updatedAt,
}: ApplicationToReviewCardProps) => {
  return (
    <div
      className={cn(
        "p-4 flex items-center justify-center rounded-md border-2 border-input bg-background",
        "h-fill flex flex-col items-center justify-between gap-4"
      )}
    >
      <OfficialProfile officialId={officialId} />
      <ApplicationStatusTag status={status} />
      <div
        className={cn(
          "w-full grid grid-cols-2 gap-2",
          status !== "pending" && "hidden"
        )}
      >
        <ApplicationButtons applicationId={id} />
      </div>
    </div>
  );
};
export default ApplicationToReviewCard;
