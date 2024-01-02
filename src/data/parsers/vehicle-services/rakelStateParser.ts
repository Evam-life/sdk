import * as z from "zod";

const rakelStateParser = z
  .object({
    msisdn: z.string().optional(),
    issi: z.string().optional(),
    gssi: z.string().optional(),
    isHealthy: z.boolean(),
  })
  .strict();

export default rakelStateParser;
