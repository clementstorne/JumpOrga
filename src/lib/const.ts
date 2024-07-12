import { Level, RadioButtonOptions } from "@/types";

export const LEVELS: Level[] = [
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

export const HAS_JUDGE: RadioButtonOptions[] = [
  { value: "false", label: "J'ai besoin d'un juge" },
  { value: "true", label: "J'ai déjà un juge" },
];
