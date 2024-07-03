import { cn } from "@/lib/utils";
import { getAllEvents } from "@actions/events/getAllEvents";
import { formatEventDates } from "@lib/dateUtils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardHeader } from "@ui/card";
import Link from "next/link";

type PastEventsSectionProps = {
  userId: string;
};

const PastEventsSection = async ({ userId }: PastEventsSectionProps) => {
  const events = await getAllEvents(userId);

  return (
    <Card>
      <CardHeader>
        <h2>Mes concours passés</h2>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>Vous n&apos;avez pas de concours terminés</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/dashboard/events/${event.id}`}
                className={cn(buttonVariants({ variant: "outline" }), "h-fit")}
              >
                <div className="flex flex-col items-center">
                  <p>
                    {event.place} •{" "}
                    <span className="font-normal">
                      {formatEventDates(event.start, event.finish)}
                    </span>
                  </p>
                  <p className="text-sm font-normal">{event.level}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PastEventsSection;
