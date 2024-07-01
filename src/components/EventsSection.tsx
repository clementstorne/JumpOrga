import { getEvents } from "@actions/events/getEvents";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import Link from "next/link";
import VisibilitySwitch from "./VisibilitySwitch";

type EventsSectionProps = {
  userId: string;
};

const EventsSection = async ({ userId }: EventsSectionProps) => {
  const events = await getEvents(userId);

  return (
    <Card>
      <CardHeader>
        <h2>Mes concours</h2>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>Vous n&apos;avez pas encore programmé de concours</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id}>
                <div className="flex justify-between">
                  <p>
                    <span className="font-bold">{event.place} • </span>
                    {formatEventDates(event.start, event.finish)}
                  </p>

                  <div className="w-16 flex flex-col justify-center items-center">
                    <VisibilitySwitch
                      eventId={event.id}
                      eventVisibility={event.isVisible}
                    />
                    {/* <Label htmlFor="visible" className="text-sm font-semibold">
                      {event.isVisible ? "Visible" : "Invisible"}
                    </Label>
                    <Switch
                      id="visible"
                      checked={event.isVisible}
                      onClick={handleOnClick}
                    /> */}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center text-center text-sm">
                  <p>Juge</p>
                  <p>Chef de piste</p>
                  <p>Commissaire au paddock</p>
                  <p>Chronométreur</p>

                  <p>{event.hasJudge ? "✅" : "❌"}</p>
                  <p>{event.hasCourseDesigner ? "✅" : "❌"}</p>
                  <p>{event.hasSteward ? "✅" : "❌"}</p>
                  <p>{event.hasTimeKeeper ? "✅" : "❌"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href="/dashboard/new-event"
          className={cn("w-full", buttonVariants({ variant: "default" }))}
        >
          Ajouter un nouveau concours
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventsSection;
