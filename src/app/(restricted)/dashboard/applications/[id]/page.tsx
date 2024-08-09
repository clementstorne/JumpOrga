import ApplicationStatusTag from "@/components/ApplicationStatusTag";
import { getSingleEventWithApplications } from "@actions/events/getSingleEventWithApplications";
import { getApplicationsList } from "@lib/applicationsUtils";
import { formatEventDates } from "@lib/dateUtils";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
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
      <CardHeader>
        <CardTitle>Candidatures</CardTitle>
        <div className="flex flex-col items-center">
          <h3>{event.place}</h3>
          <p className="font-bold">
            {formatEventDates(event.start, event.end)}
          </p>
          <p>{event.level}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-2">
          {!event.hasJudge ? <h2>Juge</h2> : null}
          {!event.hasCourseDesigner ? <h2>Chef de piste</h2> : null}
          {!event.hasSteward ? <h2>Commissaire au paddock</h2> : null}
          {!event.hasTimeKeeper ? (
            <div>
              <h2>Chronométreur</h2>
              {timeKeeperApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col items-start gap-2"
                >
                  <h3>{application.officialId}</h3>
                  <ApplicationStatusTag status={application.status} />
                  <div className="w-full grid grid-cols-2 gap-2">
                    <Button>Accepter</Button>
                    <Button variant="destructive">Rejeter</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationPage;
