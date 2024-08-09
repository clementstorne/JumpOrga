import { AppliedRole, DbEventApplication } from "@/types";

export const getApplicationsList = (
  applications: Omit<DbEventApplication, "event">[] | undefined,
  role: AppliedRole
) => {
  if (applications && applications.length > 0) {
    return applications.filter(
      (application) => application.appliedRole === role
    );
  } else {
    return [];
  }
};
