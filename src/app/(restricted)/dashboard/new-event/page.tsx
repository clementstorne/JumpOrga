import EventForm from "@components/EventForm";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JumpOrga - Ajouter un nouveau concours",
  description: "…",
};

const NewEventPage = () => {
  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <h1>Programmer un concours</h1>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
};

export default NewEventPage;
