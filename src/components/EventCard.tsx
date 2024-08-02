import { Button, buttonVariants } from "@components/ui/button";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import OfficialsStatus from "./OfficialsStatus";

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
}: EventCardProps) => {
  if (type === "organizer") {
    return (
      <Link
        href={`/dashboard/events/${id}`}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-fit relative flex flex-col items-start"
        )}
      >
        <div className="absolute top-2 right-2">
          {isVisible ? <Eye /> : <EyeOff />}
        </div>
        <div className="w-full flex flex-col items-center">
          <p>
            {place} •{" "}
            <span className="font-normal">{formatEventDates(start, end)}</span>
          </p>
          <p className="text-sm font-normal">{level}</p>
        </div>

        <OfficialsStatus
          hasJudge={hasJudge}
          hasCourseDesigner={hasCourseDesigner}
          hasSteward={hasSteward}
          hasTimeKeeper={hasTimeKeeper}
        />
      </Link>
    );
  } else {
    return (
      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-full relative flex flex-col items-center justify-start"
        )}
      >
        <div className="w-full flex flex-col items-center">
          <p>
            {place} •{" "}
            <span className="font-normal">{formatEventDates(start, end)}</span>
          </p>
          <p className="text-sm font-normal">{level}</p>
        </div>

        <div className="w-full flex flex-col space-y-2 my-4">
          <h2>Postuler</h2>
          {!hasJudge ? <Button>Juge</Button> : null}
          {!hasCourseDesigner ? <Button>Chef de piste</Button> : null}
          {!hasSteward ? <Button>Commissaire au paddock</Button> : null}
          {!hasTimeKeeper ? <Button>Chronométreur</Button> : null}
        </div>
      </div>
    );
  }
};

export default EventCard;
