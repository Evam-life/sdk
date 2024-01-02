import * as z from "zod";
import { vehicleStatusParser } from "@/data/parsers";

/**
 * Vehicle status
 * @property name The name of the vehicle status
 * @property event The event associated to this status, if any
 * @property successorName The name of a typical successor to this status based on vehicle configuration
 * @property isStartStatus true if this status is engaged at the start of a new operation
 * @property isEndStatus true if this status closes the current operation
 * @property categoryType Type if status: 'mission' or 'other'
 * @property categoryName The name of the category as defined by the vehicle user
 */
export type VehicleStatus = z.infer<typeof vehicleStatusParser>;
