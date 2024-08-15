"use client";

import { ApplicationsToReview, AppliedRole } from "@/types";
import ApplicationButtons from "@components/ApplicationButtons";
import ApplicationStatusTag from "@components/ApplicationStatusTag";
import OfficialProfile from "@components/OfficialProfile";
import { cn } from "@lib/utils";

type ApplicationToReviewCardProps = ApplicationsToReview;

const ApplicationToReviewCard = ({
  id,
  status,
  appliedRole,
  official,
}: ApplicationToReviewCardProps) => {
  const getOfficialLevel = (appliedRole: AppliedRole) => {
    if (appliedRole === "judge") {
      return official.judgeLevel as string;
    } else if (appliedRole === "steward") {
      return official.stewardLevel as string;
    } else if (appliedRole === "courseDesigner") {
      return official.courseDesignerLevel as string;
    } else {
      return "";
    }
  };
  return (
    <div
      className={cn(
        "p-4 flex items-center justify-center rounded-md border-2 border-input bg-background",
        "h-fill flex flex-col items-center justify-between gap-4"
      )}
    >
      <OfficialProfile
        user={official.user}
        level={getOfficialLevel(appliedRole)}
      />
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
