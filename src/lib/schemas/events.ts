import { z } from "zod";

const formSchema = z.object({
  start: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^(20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
          value
        ),
      "Mauvais format de date"
    ),
  end: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^(20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
          value
        ),
      "Mauvais format de date"
    ),
  place: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  level: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez sélectionner au moins une option",
  }),
  hasJudge: z.enum(["true", "false"]),
  hasCourseDesigner: z.enum(["true", "false"]),
  hasSteward: z.enum(["true", "false"]),
  hasTimeKeeper: z.enum(["true", "false"]),
  isVisible: z.boolean(),
});

export default formSchema;
