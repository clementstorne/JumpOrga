import { DbEventApplication } from "@/types";
import StatusIcon from "@components/StatusIcon";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import Link from "next/link";

type OfficialsStatusAndApplicationsProps = {
  title: string;
  status: boolean;
  applicationsList: Omit<DbEventApplication, "event">[];
  eventId: string;
};

const OfficialsStatusAndApplications = ({
  title,
  status,
  applicationsList,
  eventId,
}: OfficialsStatusAndApplicationsProps) => {
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
    <div className="flex items-start space-x-2">
      <StatusIcon status={status} />
      <div className="flex flex-col">
        <p>{title}</p>
        {applicationsList.length > 0 ? (
          <Link
            href={`/dashboard/applications/${eventId}`}
            className={cn(buttonVariants({ variant: "secondary", size: "xs" }))}
          >
            {displayNumberOfApplications(applicationsList)}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default OfficialsStatusAndApplications;
