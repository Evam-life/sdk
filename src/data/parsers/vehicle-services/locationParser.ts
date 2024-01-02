import * as z from "zod";
import { vehicleServicesDatePayloadParser } from "@/utils/common-parsers";

const locationParser = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timestamp: vehicleServicesDatePayloadParser.optional(),
});

export default locationParser;
