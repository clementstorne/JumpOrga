import { DbUser } from "@/types";
import { getUserData } from "@lib/actions/users/getUserData";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const userSession = session.user as Omit<DbUser, "password">;
  const user = await getUserData(userSession.id);
  const userFullName = `${user.firstname} ${user.lastname}`;

  return <div>Bonjour {userFullName}</div>;
};

export default DashboardPage;
