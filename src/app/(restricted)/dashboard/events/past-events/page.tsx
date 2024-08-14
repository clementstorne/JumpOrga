import { getAllPastEvents } from "@/lib/actions/events/getAllPastEvents";
import { cn } from "@/lib/utils";
import { SessionUser } from "@/types";
import { getOrganizerData } from "@actions/users/getOrganizerData";
import { getUserData } from "@actions/users/getUserData";
import EventCard from "@components/EventCard";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { getServerSession } from "next-auth";
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

  const events = await getAllPastEvents(organizer.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes concours passés</CardTitle>
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
