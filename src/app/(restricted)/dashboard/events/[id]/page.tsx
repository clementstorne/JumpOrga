import { SessionUser } from "@/types";
import { getSingleEvent } from "@actions/events/getSigneEvent";
import EventForm from "@components/EventForm";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader } from "@ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UpdateEventPage = async ({ params }: { params: { id: string } }) => {
  const event = await getSingleEvent(params.id);

  if (!event) {
    redirect("/dashboard");
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;

  if (!userSession) {
    redirect("/login");
  }

  const organizerId = userSession.organizerId as string;

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <h1>Mettre à jour un événement</h1>
      </CardHeader>
      <CardContent>
        <EventForm action="update" event={event} organizerId={organizerId} />
      </CardContent>
    </Card>
  );
};

export default UpdateEventPage;
