import { authOptions } from "@/lib/auth";
import { DbUser } from "@/types";
import PastEventsSection from "@components/PastEventsSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const PastEventsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userSession = session.user as Omit<DbUser, "password">;

  return (
    <>
      <PastEventsSection organizerId={userSession.id} display="all" />
    </>
  );
};

export default PastEventsPage;
