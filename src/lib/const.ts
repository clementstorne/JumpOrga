import {
  CourseDesignerLevel,
  EventLevel,
  JudgeLevel,
  StewardLevel,
} from "@/types";

export const EVENT_LEVELS: EventLevel[] = [
  {
    id: "amateur",
    label: "Amateur",
  },
  {
    id: "pro",
    label: "Pro",
  },
  {
    id: "enseignants",
    label: "Enseignants",
  },
  {
    id: "club",
    label: "Club",
  },
  {
    id: "poney",
    label: "Poney",
  },
  {
    id: "cyclesLibres",
    label: "Cycles Libres",
  },
  {
    id: "cyclesClassiques",
    label: "Cycles Classiques",
  },
  {
    id: "cyclesClassiquesPoneys",
    label: "Cycles Classiques Poneys",
  },
];

export const JUDGE_LEVELS: { id: JudgeLevel; label: string }[] = [
  { id: "club", label: "Club" },
  { id: "candidatNational", label: "Candidat National" },
  { id: "national", label: "National" },
  { id: "nationalElite", label: "National Élite" },
  { id: "internationalLevel1", label: "International Level 1" },
  { id: "internationalLevel2", label: "International Level 2" },
  { id: "internationalLevel3", label: "International Level 3" },
  { id: "internationalLevel4", label: "International Level 4" },
];

export const COURSE_DESIGNER_LEVELS: {
  id: CourseDesignerLevel;
  label: string;
}[] = [
  { id: "club", label: "Club" },
  { id: "candidatNational", label: "Candidat National" },
  { id: "national", label: "National" },
  { id: "candidatNationalElite", label: "Candidat National Élite" },
  { id: "nationalElite", label: "National Élite" },
  { id: "internationalLevel1", label: "International Level 1" },
  { id: "internationalLevel2", label: "International Level 2" },
  { id: "internationalLevel3", label: "International Level 3" },
  { id: "internationalLevel4", label: "International Level 4" },
];

export const STEWARD_LEVELS: { id: StewardLevel; label: string }[] = [
  { id: "club", label: "Club" },
  { id: "candidatNational", label: "Candidat National" },
  { id: "national", label: "National" },
  { id: "nationalElite", label: "National Élite" },
  { id: "internationalLevel1", label: "International Level 1" },
  { id: "internationalLevel2", label: "International Level 2" },
  { id: "internationalLevel3", label: "International Level 3" },
  { id: "internationalLevel4", label: "International Level 4" },
];
