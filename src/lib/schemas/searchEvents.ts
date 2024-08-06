import { z } from "zod";

const formSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  place: z.string().optional(),
  level: z.array(z.string()),
});

export default formSchema;
