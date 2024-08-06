import { DbEvent } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EventState {
  events: DbEvent[];
  setEvents: (events: DbEvent[]) => void;
}

const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),
    }),
    {
      name: "jump-orga-event-storage",
    }
  )
);

export default useEventStore;
