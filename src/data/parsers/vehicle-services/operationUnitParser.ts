import { z } from "zod";
import operationUnitSourceParser from "@/data/parsers/vehicle-services/operationUnitSourceParser";
import vehicleServicesDatePayloadParser from "@/utils/common-parsers/vehicleServicesDatePayloadParser";

const operationUnitParser = z.object({
  unitId: z.string(),
  status: z.string().optional(),
  role: z.string().optional(),
  source: operationUnitSourceParser.optional(),
  eta: vehicleServicesDatePayloadParser.optional(),
  reportedInArea: z.string().optional(),
});

export default operationUnitParser;
