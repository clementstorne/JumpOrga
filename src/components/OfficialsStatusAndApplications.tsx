import { ApplicationsToReview } from "@/types";
import StatusIcon from "@components/StatusIcon";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import Link from "next/link";

type OfficialsStatusAndApplicationsProps = {
  title: string;
  status: boolean;
  applicationsList: ApplicationsToReview[];
  eventId: string;
};

const OfficialsStatusAndApplications = ({
  title,
  status,
  applicationsList,
  eventId,
}: OfficialsStatusAndApplicationsProps) => {
  const applicationsToReview = applicationsList.filter(
    (application) => application.status === "pending"
  );

  const displayNumberOfApplications = (
    applications: ApplicationsToReview[]
  ) => {
    if (applications.length === 1) {
      return `${applications.length} nouvelle candidature`;
    } else if (applications.length > 1) {
      return `${applications.length} nouvelles candidatures`;
    } else {
      return "Aucune candidature";
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <StatusIcon status={status} />
      <div className="flex flex-col">
        <p>{title}</p>
        {applicationsToReview.length > 0 ? (
          <Link
            href={`/dashboard/applications/${eventId}`}
            className={cn(buttonVariants({ variant: "secondary", size: "xs" }))}
          >
            {displayNumberOfApplications(applicationsToReview)}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default OfficialsStatusAndApplications;
