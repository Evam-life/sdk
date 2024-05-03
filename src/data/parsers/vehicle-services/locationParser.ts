import * as z from "zod";
import { vehicleServicesDatePayloadParser } from "@/utils/common-parsers";

const locationParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
  bearing: z.number().optional(),
  speed: z.number().optional(),
  timestamp: vehicleServicesDatePayloadParser.optional(),
});

export default locationParser;
