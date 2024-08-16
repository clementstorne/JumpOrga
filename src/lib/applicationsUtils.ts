import { ApplicationsToReview, AppliedRole } from "@/types";

export const getApplicationsList = (
  applications: ApplicationsToReview[] | undefined,
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
