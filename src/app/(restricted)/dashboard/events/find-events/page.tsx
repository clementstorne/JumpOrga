import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SessionUser } from "@/types";
import { getOfficialData } from "@actions/users/getOfficialData";
import { getUserData } from "@actions/users/getUserData";
import EventsList from "@components/EventsList";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const PastEventsPage = async () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trouver des concours</CardTitle>
      </CardHeader>

      {!official.isJudge &&
      !official.isSteward &&
      !official.isCourseDesigner &&
      !official.isTimeKeeper ? (
        <CardContent className="flex flex-col items-center gap-2">
          <p>
            Vous devez compléter votre profil avant de pouvoir trouver des
            concours
          </p>
          <Link
            href={"/dashboard/profile"}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Compléter mon profil
          </Link>
        </CardContent>
      ) : (
        <CardContent>
          <EventsList officialId={official.id} />
        </CardContent>
      )}
    </Card>
  );
};

export default PastEventsPage;
