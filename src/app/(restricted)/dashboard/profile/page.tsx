import { SessionUser } from "@/types";
import { getOfficialData } from "@actions/users/getOfficialData";
import ProfileForm from "@components/ProfileForm";
import { getUserData } from "@lib/actions/users/getUserData";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader } from "@ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;
  const user = await getUserData(userSession.id);

  if (!user || !userSession.officialId) {
    redirect("/login");
  }

  const official = await getOfficialData(userSession.officialId);

  if (!official) {
    redirect("/login");
  }

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <h1>Modifier le profil</h1>
      </CardHeader>
      <CardContent>
        <ProfileForm user={user} official={official} />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
