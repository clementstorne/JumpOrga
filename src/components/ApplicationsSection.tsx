import { getAllApplications } from "@actions/applications/getAllApplications";
import ApplicationCard from "@components/ApplicationCard";
import { Card, CardContent, CardHeader } from "@ui/card";

type ApplicationsSectionProps = {
  officialId: string;
};

const ApplicationsSection = async ({
  officialId,
}: ApplicationsSectionProps) => {
  const applications = await getAllApplications(officialId);

  return (
    <Card>
      <CardHeader>
        <h2>Mes candidatures</h2>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p>Vous n&apos;avez candidaté pour aucun concours</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard key={application.id} {...application} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsSection;
