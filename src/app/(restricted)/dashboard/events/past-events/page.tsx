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

  const user = session.user as SessionUser;

  return (
    <>
      <PastEventsSection userId={user.id} display="all" />
    </>
  );
};

export default PastEventsPage;
