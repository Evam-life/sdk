import * as z from "zod";

const destinationControlPointLocationParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export default destinationControlPointLocationParser;
