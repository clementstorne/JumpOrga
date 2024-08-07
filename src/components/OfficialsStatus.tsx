import { AppliedRole, DbEventApplication } from "@/types";
import StatusIcon from "@components/StatusIcon";

type OfficialsStatusProps = {
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
  applications?: Omit<DbEventApplication, "event">[];
};

const OfficialsStatus = ({
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
  applications,
}: OfficialsStatusProps) => {
  const getApplicationsList = (
    applications: Omit<DbEventApplication, "event">[] | undefined,
    role: AppliedRole
  ) => {
    if (applications && applications.length > 0) {
      return applications.filter(
        (application) => application.appliedRole === role
      );
    } else {
      return [];
    }
  };
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
            <p className="font-normal text-sm">
              {displayNumberOfApplications(courseDesignerApplications)}
            </p>
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
            <p className="font-normal text-sm">
              {displayNumberOfApplications(timeKeeperApplications)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OfficialsStatus;
