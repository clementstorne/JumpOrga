import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type StatusIconProps = { status: boolean };

const StatusIcon = ({ status }: StatusIconProps) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full p-1",
        status && "bg-success text-success-foreground",
        !status && "bg-destructive text-destructive-foreground"
      )}
    >
      {status ? (
        <Check className="w-full h-full" />
      ) : (
        <X className="w-full h-full" />
      )}
    </div>
  );
};

type OfficialsStatusProps = {
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
};

const OfficialsStatus = ({
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
}: OfficialsStatusProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex">
        <StatusIcon status={hasJudge} /> <p className="ml-2">Juge</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasCourseDesigner} />{" "}
        <p className="ml-2">Chef de piste</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasSteward} />{" "}
        <p className="ml-2">Commissaire au paddock</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasTimeKeeper} />{" "}
        <p className="ml-2">Chronométreur</p>
      </div>
    </div>
  );
};

export default OfficialsStatus;
