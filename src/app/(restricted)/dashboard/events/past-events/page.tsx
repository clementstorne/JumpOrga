import { authOptions } from "@/lib/auth";
import { SessionUser } from "@/types";
import PastEventsSection from "@components/PastEventsSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const PastEventsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as SessionUser;

  if (!userSession.organizerId) {
    redirect("/login");
  }

  return (
    <>
      <PastEventsSection organizerId={userSession.organizerId} />
    </>
  );
};

export default PastEventsPage;
