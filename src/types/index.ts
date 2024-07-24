export interface NavbarLink {
  href: string;
  label: string;
}

export interface DbUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: "organizer" | "official" | "admin";
  organizerId?: string;
  officialId?: string;
}

export interface DbOrganizer {
  id: string;
  userId: string;
}

type OfficialLevel =
  | "club"
  | "candidatNational"
  | "national"
  | "candidatNationalElite"
  | "nationalElite"
  | "internationalLevel1"
  | "internationalLevel2"
  | "internationalLevel3"
  | "internationalLevel4";

export type JudgeLevel = Exclude<OfficialLevel, "candidatNationalElite">;
export type CourseDesignerLevel = OfficialLevel;
export type StewardLevel = Exclude<OfficialLevel, "candidatNationalElite">;

export interface DbOfficial {
  id: string;
  userId: string;
  isJudge: boolean;
  judgeLevel: JudgeLevel | null;
  isCourseDesigner: boolean;
  courseDesignerLevel: CourseDesignerLevel | null;
  isSteward: boolean;
  stewardLevel: StewardLevel | null;
  isTimeKeeper: boolean;
}

export type SessionUser = Pick<
  DbUser,
  "id" | "role" | "organizerId" | "officialId"
>;

export interface DbEvent {
  id: string;
  start: string;
  end: string;
  place: string;
  level: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
  isVisible: boolean;
}

export type EventLevelId =
  | "amateur"
  | "pro"
  | "enseignants"
  | "cyclesLibres"
  | "cyclesClassiques"
  | "club"
  | "poney"
  | "cyclesClassiquesPoneys";

export type EventLevelLabel =
  | "Amateur"
  | "Pro"
  | "Enseignants"
  | "Cycles Libres"
  | "Cycles Classiques"
  | "Club"
  | "Poney"
  | "Cycles Classiques Poneys";

export interface EventLevel {
  id: EventLevelId;
  label: EventLevelLabel;
}

export interface RadioButtonOptions {
  value: "true" | "false";
  label: string;
}
