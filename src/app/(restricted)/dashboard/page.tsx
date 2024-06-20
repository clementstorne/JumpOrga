import { authOptions } from "@/lib/auth";
import { getUserData } from "@/lib/data";
import { DbUser } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const userSession = session.user as Omit<DbUser, "password">;
  const user = await getUserData(userSession.id);
  const userFullName = `${user.firstname} ${user.lastname}`;

  return <div>Bonjour {userFullName}</div>;
};

export default Page;
