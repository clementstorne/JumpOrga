import StatusIcon from "@components/StatusIcon";

type OfficialsStatusProps = {
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
};

const OfficialsStatus = ({
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
}: OfficialsStatusProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex">
        <StatusIcon status={hasJudge} /> <p className="ml-2">Juge</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasCourseDesigner} />{" "}
        <p className="ml-2">Chef de piste</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasSteward} />{" "}
        <p className="ml-2">Commissaire au paddock</p>
      </div>
      <div className="flex">
        <StatusIcon status={hasTimeKeeper} />{" "}
        <p className="ml-2">Chronométreur</p>
      </div>
    </div>
  );
};

export default OfficialsStatus;
