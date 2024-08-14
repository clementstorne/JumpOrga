import { getSingleEventWithApplications } from "@/lib/actions/events/getSingleEventWithApplications";
import { SessionUser } from "@/types";
import EventForm from "@components/EventForm";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UpdateEventPage = async ({ params }: { params: { id: string } }) => {
  const event = await getSingleEventWithApplications(params.id);

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
        <CardTitle>Mettre à jour un événement</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm action="update" event={event} organizerId={organizerId} />
      </CardContent>
    </Card>
  );
};

export default UpdateEventPage;
