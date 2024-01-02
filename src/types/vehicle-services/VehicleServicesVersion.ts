import * as z from "zod";
import { vehicleServicesNotificationIdParser } from "@/data/parsers";

/**
 * The version of Vehicle Services
 */
export type VehicleServicesVersion = z.infer<
  typeof vehicleServicesNotificationIdParser
>;
