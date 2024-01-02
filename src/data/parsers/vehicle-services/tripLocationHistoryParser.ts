import * as z from "zod";
import locationParser from "@/data/parsers/vehicle-services/locationParser";

const tripLocationHistoryParser = z.object({
  locationHistory: z.array(locationParser),
  etaSeconds: z.number().optional(),
  distanceToDestinationMeters: z.number().optional(),
});

export default tripLocationHistoryParser;
