"use client";

import OfficialApplication from "@components/OfficialApplication";
import OfficialsStatus from "@components/OfficialsStatus";
import { buttonVariants } from "@components/ui/button";
import { formatEventDates } from "@lib/dateUtils";
import { cn } from "@lib/utils";
import { Eye, EyeOff } from "lucide-react";
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
  } else if (type === "official" && officialId) {
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
