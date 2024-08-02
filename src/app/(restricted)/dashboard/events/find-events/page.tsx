"use client";

import EventCard from "@/components/EventCard";
import FilterSection from "@/components/FilterSection";
import { cn } from "@/lib/utils";
import { getAllVisibleEvents } from "@actions/events/getAllVisibleEvents";
import useEventStore from "@store/eventStore";
import { Card, CardContent, CardHeader } from "@ui/card";
import { useEffect } from "react";

const PastEventsPage = () => {
  const { events, setEvents } = useEventStore();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllVisibleEvents();
      setEvents(data);
    };

    fetchEvents();
  }, [setEvents]);

  return (
    <Card>
      <CardHeader>
        <h1>Trouver des concours</h1>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p>Il n&apos;y a pas encore de concours programmés</p>
        ) : (
          <>
            <FilterSection />
            <div
              className={cn(
                "flex flex-col space-y-4",
                "md:grid md:grid-cols-2 md:space-y-0 md:gap-4",
                "lg:grid-cols-3"
              )}
            >
              {events.map((event) => (
                <EventCard key={event.id} {...event} type={"official"} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PastEventsPage;
