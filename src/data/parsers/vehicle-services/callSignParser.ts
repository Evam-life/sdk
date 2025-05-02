import * as z from "zod";

const callSignParser = z.object({
  name: z.string(),
  isMultiUse: z.boolean(),
  isUsed: z.boolean(),
  isOwn: z.boolean(),
  folder: z.string().optional(),
});

export default callSignParser;
