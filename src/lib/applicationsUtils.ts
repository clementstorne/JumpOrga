import { AppliedRole, DbEventApplication } from "@/types";

export const getApplicationsList = (
  applications: DbEventApplication[] | undefined,
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
