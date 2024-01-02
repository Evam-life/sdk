import * as z from "zod";
import { vehicleServicesNotificationIdParser } from "@/data/parsers";

/**
 * A uuid of a sent VehicleServicesNotification
 */
export type VehicleServicesNotificationId = z.infer<
  typeof vehicleServicesNotificationIdParser
>;
