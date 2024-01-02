import * as z from "zod";

const destinationSiteLocationParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
  street: z.string().optional(),
  locality: z.string().optional(),
  municipality: z.string().optional(),
  routeDirections: z.string().optional(),
  pickupTime: z.string().optional(),
});

export default destinationSiteLocationParser;
