import { SessionUser } from "@/types";
import { getAllApplications } from "@actions/applications/getAllApplications";
import { getOfficialData } from "@actions/users/getOfficialData";
import { getUserData } from "@actions/users/getUserData";
import ApplicationCard from "@components/ApplicationCard";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { authOptions } from "@lib/auth";
import { cn } from "@lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ApplicationPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;
  const user = await getUserData(userSession.id);

  if (!user) {
    redirect("/login");
  }

  const official = await getOfficialData(user.id);

  if (!official) {
    redirect("/login");
  }

  const applications = await getAllApplications(official.id);

  return (
    <Card>
      <CardHeader>
        <h1>Mes candidatures</h1>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <p>Vous n&apos;avez encore candidaté pour aucun concours</p>
        ) : (
          <>
            <div
              className={cn(
                "flex flex-col space-y-4",
                "md:grid md:grid-cols-2 md:space-y-0 md:gap-4",
                "lg:grid-cols-3"
              )}
            >
              {applications.map((application) => (
                <ApplicationCard key={application.id} {...application} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationPage;
