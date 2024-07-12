import { SessionUser } from "@/types";
import { getUserData } from "@actions/users/getUserData";
import FutureEventsSection from "@components/FutureEventsSection";
import PastEventsSection from "@components/PastEventsSection";
import { authOptions } from "@lib/auth";
import { cn } from "@lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;
  const user = await getUserData(userSession.id);

  if (!user) {
    redirect("/login");
  }

  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <div className={cn("space-y-4", "md:space-y-8")}>
      <h1>Bonjour {userFullName}</h1>

      <div className={cn("grid grid-cols-1 gap-4", "md:grid-cols-2 md:gap-8")}>
        {user.organizer ? (
          <>
            <FutureEventsSection organizerId={user.organizer.id} />
            <PastEventsSection organizerId={user.organizer.id} display={3} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPage;
