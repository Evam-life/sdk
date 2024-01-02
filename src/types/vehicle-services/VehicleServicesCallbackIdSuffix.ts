import { z } from "zod";
import vehicleServicesCallbackIdSuffixParser from "@/data/parsers/vehicle-services/vehicleServicesCallbackIdSuffixParser";

/**
 * @ignore
 */
export type VehicleServicesCallbackIdSuffix = z.infer<
  typeof vehicleServicesCallbackIdSuffixParser
>;
