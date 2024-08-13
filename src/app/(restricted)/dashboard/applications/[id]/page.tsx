import { getSingleEventWithApplications } from "@actions/events/getSingleEventWithApplications";
import ApplicationsList from "@components/ApplicationsList";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { getApplicationsList } from "@lib/applicationsUtils";
import { formatEventDates } from "@lib/dateUtils";
import { redirect } from "next/navigation";

const ApplicationPage = async ({ params }: { params: { id: string } }) => {
  const event = await getSingleEventWithApplications(params.id);

  if (!event) {
    redirect("/dashboard");
  }

  const judgeApplications = getApplicationsList(event.applications, "judge");
  const stewardApplications = getApplicationsList(
    event.applications,
    "steward"
  );
  const courseDesignerApplications = getApplicationsList(
    event.applications,
    "courseDesigner"
  );
  const timeKeeperApplications = getApplicationsList(
    event.applications,
    "timeKeeper"
  );

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader className="gap-4">
        <CardTitle>Candidatures</CardTitle>
        <div className="flex flex-col items-start">
          <h3>{event.place}</h3>
          <p className="font-bold">
            {formatEventDates(event.start, event.end)}
          </p>
          <p>{event.level}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-2">
          {judgeApplications.length > 0 ? (
            <div>
              <h2>Juge</h2>
              <ApplicationsList applications={judgeApplications} />
            </div>
          ) : null}
          {courseDesignerApplications.length > 0 ? (
            <div>
              <h2>Chef de piste</h2>
              <ApplicationsList applications={courseDesignerApplications} />
            </div>
          ) : null}
          {stewardApplications.length > 0 ? (
            <div>
              <h2>Commissaire au paddock</h2>
              <ApplicationsList applications={stewardApplications} />
            </div>
          ) : null}
          {timeKeeperApplications.length > 0 ? (
            <div>
              <h2>Chronométreur</h2>
              <ApplicationsList applications={timeKeeperApplications} />
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationPage;
