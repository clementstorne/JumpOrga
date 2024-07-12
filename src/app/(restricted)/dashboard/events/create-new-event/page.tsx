import { SessionUser } from "@/types";
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
        <h1>Programmer un concours</h1>
      </CardHeader>
      <CardContent>
        <EventForm action="create" organizerId={organizerId} />
      </CardContent>
    </Card>
  );
};

export default NewEventPage;
