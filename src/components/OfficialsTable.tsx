import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";

type OfficialsTableProps = {
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
};

const OfficialsTable = ({
  hasJudge,
  hasCourseDesigner,
  hasSteward,
  hasTimeKeeper,
}: OfficialsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Juge</TableHead>
          <TableHead>Chef de piste</TableHead>
          <TableHead>Commissaire au paddock</TableHead>
          <TableHead>Chronométreur</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="text-center">
          <TableCell>{hasJudge ? "✅" : "❌"}</TableCell>
          <TableCell>{hasCourseDesigner ? "✅" : "❌"}</TableCell>
          <TableCell>{hasSteward ? "✅" : "❌"}</TableCell>
          <TableCell>{hasTimeKeeper ? "✅" : "❌"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OfficialsTable;
