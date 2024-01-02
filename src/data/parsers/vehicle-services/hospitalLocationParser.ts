import * as z from "zod";

const hospitalLocationParser = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
  street1: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
});

export default hospitalLocationParser;
