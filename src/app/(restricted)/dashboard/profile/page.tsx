import { getOrganizerData } from "@/lib/actions/users/getOrganizerData";
import { SessionUser } from "@/types";
import { getOfficialData } from "@actions/users/getOfficialData";
import ProfileForm from "@components/ProfileForm";
import { getUserData } from "@lib/actions/users/getUserData";
import { authOptions } from "@lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
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
  const organizer = await getOrganizerData(user.id);

  return (
    <Card className="w-full min-h-[calc(100svh-8rem)]">
      <CardHeader>
        <CardTitle>Modifier mon profil</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm user={user} official={official ? official : undefined} />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
