"use client";

import { cn } from "@/lib/utils";
import { DbEventApplication } from "@/types";
import { acceptApplication } from "@actions/applications/acceptApplication";
import { rejetApplication } from "@actions/applications/rejectApplication";
import ApplicationStatusTag from "@components/ApplicationStatusTag";
import { Button } from "@ui/button";

type ApplicationsListProps = {
  applications: Omit<DbEventApplication, "event">[];
};
const ApplicationsList = ({ applications }: ApplicationsListProps) => {
  const onAccept = async (id: string) => {
    await acceptApplication(id);
  };

  const onReject = async (id: string) => {
    await rejetApplication(id);
  };

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id} className="flex flex-col items-start gap-2">
          <h3>{application.officialId}</h3>
          <ApplicationStatusTag status={application.status} />
          <div
            className={cn(
              "w-full grid grid-cols-2 gap-2",
              application.status !== "pending" && "hidden"
            )}
          >
            <Button onClick={() => onAccept(application.id)}>Accepter</Button>
            <Button
              onClick={() => onReject(application.id)}
              variant="destructive"
            >
              Refuser
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsList;
