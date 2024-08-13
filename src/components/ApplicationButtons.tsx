"use client";

import { acceptApplication } from "@actions/applications/acceptApplication";
import { rejetApplication } from "@actions/applications/rejectApplication";
import { Button } from "@ui/button";

type ApplicationButtonsProps = {
  applicationId: string;
};

const ApplicationButtons = ({ applicationId }: ApplicationButtonsProps) => {
  const onAccept = async (id: string) => {
    await acceptApplication(id);
  };

  const onReject = async (id: string) => {
    await rejetApplication(id);
  };

  return (
    <>
      <Button onClick={() => onAccept(applicationId)}>Accepter</Button>
      <Button onClick={() => onReject(applicationId)} variant="destructive">
        Refuser
      </Button>
    </>
  );
};

export default ApplicationButtons;
