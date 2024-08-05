import { SessionUser } from "@/types";
import { applyForEvent } from "@actions/applications/applyForEvent";
import { getOfficialData } from "@actions/users/getOfficialData";
import { getUserData } from "@actions/users/getUserData";
import { authOptions } from "@lib/auth";
import { roleTranslations } from "@lib/translations";
import { OfficialRole } from "@prisma/client";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type OfficialApplicationProps = {
  eventId: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
};

const OfficialApplication = async ({
  eventId,
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
}: OfficialApplicationProps) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;
  const user = await getUserData(userSession.id);

  if (!user) {
    redirect("/login");
  }

  const official = await getOfficialData(user.id);

  if (!official) {
    redirect("/login");
  }

  const { toast } = useToast();

  const handleApply = async (role: OfficialRole) => {
    try {
      await applyForEvent(eventId, official.id, role);
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
