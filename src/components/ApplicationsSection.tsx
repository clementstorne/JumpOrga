import { cn } from "@/lib/utils";
import { getAllApplications } from "@actions/applications/getAllApplications";
import ApplicationCard from "@components/ApplicationCard";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardHeader } from "@ui/card";
import Link from "next/link";

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
      {applications.length === 0 ? (
        <CardContent className="flex flex-col items-center gap-2">
          <p>Vous n&apos;avez encore candidaté pour aucun concours</p>
          <Link
            href={"/dashboard/profile"}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Trouver des concours
          </Link>
        </CardContent>
      ) : (
        <CardContent
          className={cn(
            "flex flex-col gap-4",
            "md:grid md:grid-cols-2",
            "lg:grid-cols-3"
          )}
        >
          {applications.map((application) => (
            <ApplicationCard key={application.id} {...application} />
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default ApplicationsSection;
