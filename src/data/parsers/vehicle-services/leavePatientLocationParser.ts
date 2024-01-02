import * as z from "zod";

const leavePatientLocationParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
  street: z.string().optional(),
  locality: z.string().optional(),
  municipality: z.string().optional(),
  routeDirections: z.string().optional(),
  leaveTime: z.string().optional(),
});

export default leavePatientLocationParser;
