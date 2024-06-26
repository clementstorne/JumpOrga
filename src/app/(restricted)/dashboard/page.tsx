import { buttonVariants } from "@/components/ui/button";
import { DbUser } from "@/types";
import { getUserData } from "@lib/actions/users/getUserData";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const userSession = session.user as Omit<DbUser, "password">;
  const user = await getUserData(userSession.id);
  const userFullName = `${user.firstname} ${user.lastname}`;

  return (
    <div>
      <h1>Bonjour {userFullName}</h1>
      <Link
        href="/dashboard/new-event"
        className={buttonVariants({ variant: "default" })}
      >
        Ajouter un nouveau concours
      </Link>
    </div>
  );
};

export default DashboardPage;
