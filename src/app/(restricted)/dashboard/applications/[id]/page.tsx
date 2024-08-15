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
        <div className="flex flex-col items-center">
          <h3>{event.place}</h3>
          <p className="font-bold">
            {formatEventDates(event.start, event.end)}
          </p>
          <p>{event.level}</p>
        </div>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-start gap-4">
        {judgeApplications.length > 0 ? (
          <ApplicationsList title="Juge" applications={judgeApplications} />
        ) : null}
        {courseDesignerApplications.length > 0 ? (
          <ApplicationsList
            title="Chef de piste"
            applications={courseDesignerApplications}
          />
        ) : null}
        {stewardApplications.length > 0 ? (
          <ApplicationsList
            title="Commissaire au paddock"
            applications={stewardApplications}
          />
        ) : null}
        {timeKeeperApplications.length > 0 ? (
          <ApplicationsList
            title="Chronométreur"
            applications={timeKeeperApplications}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ApplicationPage;
