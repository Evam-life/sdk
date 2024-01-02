import * as z from "zod";

const operationPriorityParser = z.object({
  id: z.number(),
  name: z.string(),
});

export default operationPriorityParser;
