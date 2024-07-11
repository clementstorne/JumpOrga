import { getAllFutureEvents } from "@lib/actions/events/getAllFutureEvents";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import Link from "next/link";
import EventCard from "./EventCard";

type FutureEventsSectionProps = {
  organizerId: string;
};

const FutureEventsSection = async ({
  organizerId,
}: FutureEventsSectionProps) => {
  const events = await getAllFutureEvents(organizerId);

  return (
    <Card>
      <CardHeader>
        <h2>Mes concours à venir</h2>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>Vous n&apos;avez pas encore programmé de concours</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href="/dashboard/events/create-new-event"
          className={cn("w-full", buttonVariants({ variant: "default" }))}
        >
          Ajouter un nouveau concours
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FutureEventsSection;
