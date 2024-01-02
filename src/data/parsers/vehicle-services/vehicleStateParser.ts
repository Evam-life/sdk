import * as z from "zod";
import vehicleStatusParser from "@/data/parsers/vehicle-services/vehicleStatusParser";
import locationParser from "@/data/parsers/vehicle-services/locationParser";
import { vehicleServicesDatePayloadParser } from "@/utils/common-parsers";

const vehicleStateParser = z.object({
  timestamp: vehicleServicesDatePayloadParser,
  vehicleStatus: vehicleStatusParser.optional(),
  activeCaseFullId: z.string().optional(),
  vehicleLocation: locationParser.optional(),
});

export default vehicleStateParser;
