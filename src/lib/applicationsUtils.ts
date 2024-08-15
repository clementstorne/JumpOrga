import { AppliedRole } from "@/types";

export const getApplicationsList = (
  applications: any[] | undefined,
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
