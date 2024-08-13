import { DbEventApplication } from "@/types";
import ApplicationToReviewCard from "./ApplicationToReviewCard";

type ApplicationsListProps = {
  applications: Omit<DbEventApplication, "event">[];
};
const ApplicationsList = ({ applications }: ApplicationsListProps) => {
  return (
    <div>
      {applications.map((application) => (
        <ApplicationToReviewCard key={application.id} {...application} />
      ))}
    </div>
  );
};

export default ApplicationsList;
