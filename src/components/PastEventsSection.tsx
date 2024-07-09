import { getAllPastEvents } from "@/lib/actions/events/getAllPastEvents";
import { getSomePastEvents } from "@/lib/actions/events/getSomePastEvents";
import { cn } from "@/lib/utils";
import { formatEventDates } from "@lib/dateUtils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import Link from "next/link";

type PastEventsSectionProps = {
  organizerId: string;
  display: "all" | "three";
};

const PastEventsSection = async ({
  organizerId,
  display,
}: PastEventsSectionProps) => {
  let events = [];
  display === "all"
    ? (events = await getAllPastEvents(organizerId))
    : (events = await getSomePastEvents(organizerId, 3));
  // const events = await getThreePastEvents(userId);

  return (
    <Card>
      <CardHeader>
        {display === "three" ? (
          <h2>Mes concours passés</h2>
        ) : (
          <h1>Mes concours passés</h1>
        )}
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
                      {formatEventDates(event.start, event.end)}
                    </span>
                  </p>
                  <p className="text-sm font-normal">{event.level}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
      {display === "three" ? (
        <CardFooter>
          <Link
            href="/dashboard/events/past-events"
            className={cn("w-full", buttonVariants({ variant: "default" }))}
          >
            Voir tous les concours passés
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default PastEventsSection;
