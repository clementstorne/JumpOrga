import { ApplicationsToReview } from "@/types";
import ApplicationToReviewCard from "@components/ApplicationToReviewCard";
import { cn } from "@lib/utils";

type ApplicationsListProps = {
  title: string;
  applications: ApplicationsToReview[];
};
const ApplicationsList = ({ title, applications }: ApplicationsListProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2>{title}</h2>
      <div
        className={cn(
          "w-full flex flex-col space-y-4",
          "md:grid md:grid-cols-2 md:space-y-0 md:gap-4",
          "lg:grid-cols-3"
        )}
      >
        {applications.map((application) => (
          <ApplicationToReviewCard key={application.id} {...application} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;
