import * as z from "zod";

const csCertifiedAppEventParser = z
  .object({
    event: z.string(),
    details: z.string().optional(),
  })
  .strict();

export default csCertifiedAppEventParser;
