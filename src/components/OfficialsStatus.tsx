import { DbEventApplication } from "@/types";
import StatusIcon from "@components/StatusIcon";
import { getApplicationsList } from "@lib/applicationsUtils";
import { cn } from "@lib/utils";
import { Button, buttonVariants } from "@ui/button";
import Link from "next/link";

type OfficialsStatusProps = {
  eventId: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
  applications?: Omit<DbEventApplication, "event">[];
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

  const displayNumberOfApplications = (
    applications: Omit<DbEventApplication, "event">[]
  ) => {
    if (applications.length === 1) {
      return `${applications.length} candidature`;
    } else if (applications.length > 1) {
      return `${applications.length} candidatures`;
    } else {
      return "Aucune candidature";
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-start space-x-2">
        <StatusIcon status={hasJudge} />
        <div className="flex flex-col">
          <p>Juge</p>
          {!hasJudge ? (
            <p className="font-normal text-sm">
              {displayNumberOfApplications(judgeApplications)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <StatusIcon status={hasCourseDesigner} />
        <div className="flex flex-col">
          <p>Chef de piste</p>
          {!hasCourseDesigner ? (
            <Button>
              {displayNumberOfApplications(courseDesignerApplications)}
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <StatusIcon status={hasSteward} />
        <div className="flex flex-col">
          <p>Commissaire au paddock</p>
          {!hasSteward ? (
            <p className="font-normal text-sm">
              {displayNumberOfApplications(stewardApplications)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <StatusIcon status={hasTimeKeeper} />
        <div className="flex flex-col">
          <p>Chronométreur</p>
          {!hasTimeKeeper ? (
            <Link
              href={`/dashboard/applications/${eventId}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "xs" })
              )}
            >
              {displayNumberOfApplications(timeKeeperApplications)}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OfficialsStatus;
