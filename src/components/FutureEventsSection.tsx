import { getAllEvents } from "@actions/events/getAllEvents";
import OfficialsTable from "@components/OfficialsTable";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type FutureEventsSectionProps = {
  userId: string;
};

const FutureEventsSection = async ({ userId }: FutureEventsSectionProps) => {
  const events = await getAllEvents(userId);

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
              <Link
                key={event.id}
                href={`/dashboard/events/${event.id}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-fit relative flex flex-col items-start"
                )}
              >
                <div className="absolute top-2 right-2">
                  {event.isVisible ? <Eye /> : <EyeOff />}
                </div>
                <div className="w-full flex flex-col items-center">
                  <p>
                    {event.place} •{" "}
                    <span className="font-normal">
                      {formatEventDates(event.start, event.finish)}
                    </span>
                  </p>
                  <p className="text-sm font-normal">{event.level}</p>
                </div>

                <OfficialsTable {...event} />
              </Link>
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
