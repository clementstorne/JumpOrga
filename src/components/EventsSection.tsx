import { getEvents } from "@actions/events/getEvents";
import OfficialsTable from "@components/OfficialsTable";
import VisibilitySwitch from "@components/VisibilitySwitch";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import Link from "next/link";

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
              <div
                key={event.id}
                className="bg-secondary/10 py-2 px-4 rounded-md border border-secondary"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-lg">
                      <span className="font-bold">{event.place} • </span>
                      {formatEventDates(event.start, event.finish)}
                    </p>
                    <p className="font-light">{event.level}</p>
                  </div>

                  <div className="w-16 flex flex-col justify-center items-center">
                    <VisibilitySwitch
                      eventId={event.id}
                      eventVisibility={event.isVisible}
                    />
                  </div>
                </div>

                <OfficialsTable {...event} />
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
