import { cn } from "@/lib/utils";
import { SessionUser } from "@/types";
import { getAllFutureEvents } from "@actions/events/getAllFutureEvents";
import { getOrganizerData } from "@actions/users/getOrganizerData";
import { getUserData } from "@actions/users/getUserData";
import EventCard from "@components/EventCard";
import { buttonVariants } from "@components/ui/button";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const PastEventsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;
  const user = await getUserData(userSession.id);

  if (!user) {
    redirect("/login");
  }

  const organizer = await getOrganizerData(user.id);

  if (!organizer) {
    redirect("/login");
  }

  const events = await getAllFutureEvents(organizer.id);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <h1>Mes concours à venir</h1>
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

export default PastEventsPage;
