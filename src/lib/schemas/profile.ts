import { z } from "zod";

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  lastname: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  email: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .email({
      message: "Mauvais format d'email",
    }),
  isJudge: z.enum(["true", "false"]),
  judgeLevel: z.enum([
    "club",
    "candidatNational",
    "national",
    "nationalElite",
    "internationalLevel1",
    "internationalLevel2",
    "internationalLevel3",
    "internationalLevel4",
    "",
  ]),
  isCourseDesigner: z.enum(["true", "false"]),
  courseDesignerLevel: z.enum([
    "club",
    "candidatNational",
    "national",
    "candidatNationalElite",
    "nationalElite",
    "internationalLevel1",
    "internationalLevel2",
    "internationalLevel3",
    "internationalLevel4",
    "",
  ]),
  isSteward: z.enum(["true", "false"]),
  stewardLevel: z.enum([
    "club",
    "candidatNational",
    "national",
    "nationalElite",
    "internationalLevel1",
    "internationalLevel2",
    "internationalLevel3",
    "internationalLevel4",
    "",
  ]),
  isTimeKeeper: z.enum(["true", "false"]),
});

export default formSchema;
