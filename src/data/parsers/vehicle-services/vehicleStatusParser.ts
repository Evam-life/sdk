import * as z from "zod";

const vehicleStatusParser = z.object({
  name: z.string(),
  event: z.string().optional(),
  successorName: z.string().optional(),
  isStartStatus: z.boolean(),
  isEndStatus: z.boolean(),
  categoryType: z.string(),
  categoryName: z.string(),
});

export default vehicleStatusParser;
