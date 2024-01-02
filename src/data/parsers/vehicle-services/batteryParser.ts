import * as z from "zod";
import batteryHealthParser from "@/data/parsers/vehicle-services/batteryHealthParser";
import batteryPluggedParser from "@/data/parsers/vehicle-services/batteryPluggedParser";
import batteryStatusParser from "@/data/parsers/vehicle-services/batteryStatusParser";

const batteryParser = z
  .object({
    health: batteryHealthParser.optional(),
    plugged: batteryPluggedParser.optional(),
    status: batteryStatusParser.optional(),
    capacity: z.number().optional(),
  })
  .strict();

export default batteryParser;
