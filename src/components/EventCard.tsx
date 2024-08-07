"use client";

import { DbEventApplication } from "@/types";
import { changeVisibility } from "@actions/events/changeVisibility";
import { deleteEvent } from "@actions/events/deleteEvent";
import OfficialApplication from "@components/OfficialApplication";
import OfficialsStatus from "@components/OfficialsStatus";
import { Button, buttonVariants } from "@components/ui/button";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { useToast } from "@ui/use-toast";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type EventCardProps = {
  id: string;
  start: string;
  end: string;
  place: string;
  level: string;
  isVisible: boolean;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
  type?: "organizer" | "official";
  officialId?: string;
  applications: Omit<DbEventApplication, "event">[];
};

const EventCard = ({
  id,
  start,
  end,
  place,
  level,
  isVisible,
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
  type = "organizer",
  officialId,
  applications,
}: EventCardProps) => {
  const { toast } = useToast();

  const handleClickOnDeleteButton = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      toast({
        description: `Votre concours a été supprimé avec succès !`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    }
  };

  const handleClickOnChangeVisibilityButton = async (
    eventId: string,
    isVisible: boolean
  ) => {
    try {
      await changeVisibility(eventId, isVisible);
      if (isVisible) {
        toast({
          description: `Tous les officiels peuvent voir votre concours`,
        });
      } else {
        toast({
          description: `Vous êtes désormais le seul à pouvoir voir votre concours`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    }
  };

  if (type === "organizer") {
    return (
      <div
        className={cn(
          "p-4 flex items-center justify-center rounded-md border-2 border-input bg-background",
          "h-fill flex flex-col items-start justify-between gap-4",
          "hover:bg-background"
        )}
      >
        <div className="w-full flex flex-col items-center">
          <h3>{place}</h3>
          <p className="font-bold">{formatEventDates(start, end)}</p>
          <p>{level}</p>
          {isVisible ? (
            <>
              <Eye />
              <span className="sr-only">Visible pour les officiels</span>
            </>
          ) : (
            <>
              <EyeOff />
              <span className="sr-only">Invisible pour les officiels</span>
            </>
          )}
        </div>

        <OfficialsStatus
          hasJudge={hasJudge}
          hasCourseDesigner={hasCourseDesigner}
          hasSteward={hasSteward}
          hasTimeKeeper={hasTimeKeeper}
          applications={applications}
        />

        <div className={cn("w-full flex flex-col gap-2")}>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full flex items-center justify-center gap-2"
            )}
            href={`/dashboard/events/${id}`}
          >
            <Pencil />
            <span>Modifier le concours</span>
          </Link>

          <Button
            variant="destructive"
            className={cn("w-full flex items-center justify-center gap-2")}
            onClick={() => handleClickOnDeleteButton(id)}
          >
            <Trash2 />
            <span>Supprimer le concours</span>
          </Button>
        </div>
      </div>
    );
  } else if (type === "official" && officialId) {
    return (
      <div
        className={cn(
          "p-4 flex items-center justify-center rounded-md border-2 border-input bg-background",
          "h-fill flex flex-col items-start justify-between gap-4",
          "hover:bg-background"
        )}
      >
        <div className="w-full flex flex-col items-center">
          <h3>{place}</h3>
          <p className="font-bold">{formatEventDates(start, end)}</p>
          <p>{level}</p>
        </div>

        <OfficialApplication
          eventId={id}
          officialId={officialId}
          hasJudge={hasJudge}
          hasCourseDesigner={hasCourseDesigner}
          hasSteward={hasSteward}
          hasTimeKeeper={hasTimeKeeper}
        />
      </div>
    );
  }
};

export default EventCard;
