import { SessionUser } from "@/types";
import { getOrganizerData } from "@actions/users/getOrganizerData";
import { getUserData } from "@actions/users/getUserData";
import PastEventsSection from "@components/PastEventsSection";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
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

  const organizer = await getOrganizerData(user.id);

  if (!organizer) {
    redirect("/login");
  }

  return (
    <>
      <PastEventsSection organizerId={organizer.id} />
    </>
  );
};

export default PastEventsPage;
