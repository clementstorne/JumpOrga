import { SessionUser } from "@/types";
import { getOrganizerData } from "@actions/users/getOrganizerData";
import { getUserData } from "@actions/users/getUserData";
import EventForm from "@components/EventForm";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "JumpOrga - Ajouter un nouveau concours",
  description: "…",
};

const NewEventPage = async () => {
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

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <h1>Programmer un concours</h1>
      </CardHeader>
      <CardContent>
        <EventForm action="create" organizerId={organizer.id} />
      </CardContent>
    </Card>
  );
};

export default NewEventPage;
