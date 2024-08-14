"use client";

import { applyForEvent } from "@actions/applications/applyForEvent";
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
      await applyForEvent(eventId, officialId, role);
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
    <div className="h-fill w-full flex flex-col gap-2">
      <h4>Postuler</h4>
      <p>Vous pouvez candidater pour ce concours en tant que :</p>
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
