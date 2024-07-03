import EventForm from "@/components/EventForm";
import { getSingleEvent } from "@actions/events/getSigneEvent";
import { Card, CardContent, CardHeader } from "@ui/card";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const event = await getSingleEvent(params.id);

  if (!event) {
    redirect("/dashboard");
  }

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <h1>Mettre à jour un événement</h1>
      </CardHeader>
      <CardContent>
        <EventForm action="update" event={event} userId={"1"} />
      </CardContent>
    </Card>
  );
};

export default page;
