import * as z from "zod";
import { vehicleStateParser } from "@/data/parsers";

/**
 * State of the vehicle, location, status, id
 * @property {Date} timestamp the date of when state received
 * @property {VehicleStatus} vehicleStatus the status of the vehicle
 * @see VehicleStatus
 * @property {string} activeCaseFullId id of the current active operation
 * @property {Location} vehicleLocation the current vehicle location
 */
export type VehicleState = z.infer<typeof vehicleStateParser>;
