import { ApplicationsToReview } from "@/types";
import OfficialsStatusAndApplications from "@components/OfficialsStatusAndApplications";
import { getApplicationsList } from "@lib/applicationsUtils";

type OfficialsStatusProps = {
  eventId: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
  applications?: ApplicationsToReview[];
};

const OfficialsStatus = ({
  eventId,
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
  applications,
}: OfficialsStatusProps) => {
  const judgeApplications = getApplicationsList(applications, "judge");
  const stewardApplications = getApplicationsList(applications, "steward");
  const courseDesignerApplications = getApplicationsList(
    applications,
    "courseDesigner"
  );
  const timeKeeperApplications = getApplicationsList(
    applications,
    "timeKeeper"
  );

  return (
    <div className="flex flex-col space-y-1">
      <OfficialsStatusAndApplications
        title="Juge"
        status={hasJudge}
        applicationsList={judgeApplications}
        eventId={eventId}
      />
      <OfficialsStatusAndApplications
        title="Chef de piste"
        status={hasCourseDesigner}
        applicationsList={courseDesignerApplications}
        eventId={eventId}
      />
      <OfficialsStatusAndApplications
        title="Commissaire au paddock"
        status={hasSteward}
        applicationsList={stewardApplications}
        eventId={eventId}
      />
      <OfficialsStatusAndApplications
        title="Chronométreur"
        status={hasTimeKeeper}
        applicationsList={timeKeeperApplications}
        eventId={eventId}
      />
    </div>
  );
};

export default OfficialsStatus;
