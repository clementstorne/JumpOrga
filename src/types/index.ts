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
  // imageUrl?: string;
  role: "organizer" | "official" | "admin";
}

export interface DbEvent {
  id: string;
  start: string;
  finish: string;
  place: string;
  level: string;
  hasJudge: boolean;
  hasCourseDesigner: boolean;
  hasSteward: boolean;
  hasTimeKeeper: boolean;
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
