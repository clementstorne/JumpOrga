import { getAllFutureEvents } from "@actions/events/getAllFutureEvents";
import EventCard from "@components/EventCard";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

type FutureEventsSectionProps = {
  organizerId: string;
};

const FutureEventsSection = async ({
  organizerId,
}: FutureEventsSectionProps) => {
  const events = await getAllFutureEvents(organizerId);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <h2>Mes concours à venir</h2>
        <Link
          href="/dashboard/events/create-new-event"
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            "md:w-fit md:flex md:items-center md:justify-center md:gap-2",
            "md:h-10 md:px-4 md:py-2"
          )}
        >
          <Plus />
          <span className="max-md:sr-only">Créer un nouveau concours</span>
        </Link>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>Vous n&apos;avez pas encore créé de concours</p>
        ) : (
          <div
            className={cn(
              "flex flex-col gap-4",
              "md:grid md:grid-cols-2",
              "lg:grid-cols-3"
            )}
          >
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FutureEventsSection;
