import { cn } from "@lib/utils";
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

export default StatusIcon;
