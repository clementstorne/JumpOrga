"use client";

import { changeVisibility } from "@actions/events/changeVisibility";
import { Label } from "@ui/label";
import { Switch } from "@ui/switch";

type VisibilitySwitchProps = {
  eventId: string;
  eventVisibility: boolean;
};

const VisibilitySwitch = ({
  eventId,
  eventVisibility,
}: VisibilitySwitchProps) => {
  const handleOnClick = async () => {
    await changeVisibility(eventId, !eventVisibility);
  };

  return (
    <div className="w-16 flex flex-col justify-center items-center">
      <Label htmlFor="visible" className="text-sm font-semibold">
        {eventVisibility ? "Visible" : "Invisible"}
      </Label>
      <Switch id="visible" checked={eventVisibility} onClick={handleOnClick} />
    </div>
  );
};

export default VisibilitySwitch;
