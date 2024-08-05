"use client";

import { applyForEvent } from "@/lib/actions/applications/applyForEvent";
import { roleTranslations } from "@lib/translations";
import { OfficialRole } from "@prisma/client";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";

type OfficialApplicationProps = {
  eventId: string;
  officialId: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
};

const OfficialApplication = ({
  eventId,
  officialId,
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
}: OfficialApplicationProps) => {
  const { toast } = useToast();

  const handleApply = async (role: OfficialRole) => {
    try {
      await applyForEvent(
        eventId,
        "71b094d1-0891-43ef-9b87-e18d2afcd499",
        role
      );
      toast({
        description: `Votre candidature en tant que ${roleTranslations[role]} a été soumise avec succès !`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2 my-4">
      <h2>Postuler</h2>
      {!hasJudge ? (
        <Button onClick={() => handleApply(OfficialRole.judge)}>Juge</Button>
      ) : null}
      {!hasCourseDesigner ? (
        <Button onClick={() => handleApply(OfficialRole.courseDesigner)}>
          Chef de piste
        </Button>
      ) : null}
      {!hasSteward ? (
        <Button onClick={() => handleApply(OfficialRole.steward)}>
          Commissaire au paddock
        </Button>
      ) : null}
      {!hasTimeKeeper ? (
        <Button onClick={() => handleApply(OfficialRole.timeKeeper)}>
          Chronométreur
        </Button>
      ) : null}
    </div>
  );
};

export default OfficialApplication;
