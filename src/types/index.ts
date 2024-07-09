export interface Link {
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
  organizer?: any;
}

export interface DbOrganizer {
  id: string;
  userId: string;
}

export type SessionUser = Pick<DbUser, "id" | "role">;

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

export type LevelId =
  | "amateur"
  | "pro"
  | "enseignants"
  | "cyclesLibres"
  | "cyclesClassiques"
  | "club"
  | "poney"
  | "cyclesClassiquesPoneys";

export type LevelLabel =
  | "Amateur"
  | "Pro"
  | "Enseignants"
  | "Cycles Libres"
  | "Cycles Classiques"
  | "Club"
  | "Poney"
  | "Cycles Classiques Poneys";

export interface Level {
  id: LevelId;
  label: LevelLabel;
}

export interface RadioButtonOptions {
  value: "true" | "false";
  label: string;
}
