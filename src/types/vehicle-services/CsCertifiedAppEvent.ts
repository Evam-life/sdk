import * as z from "zod";
import csCertifiedAppEventParser from "@/data/parsers/vehicle-services/csCertifiedAppEventParser";

/**
 * Represents the current Battery state
 * @property {BatteryHealth | undefined} health - The health status of the battery.
 * @property {BatteryStatus | undefined} status - The charging state of the battery.
 * @property {number | undefined} capacity - The remaining charge in the battery.
 * @property {BatteryPlugged | undefined} plugged - The plugged status of the battery.
 */
export type CsCertifiedAppEvent = z.infer<typeof csCertifiedAppEventParser>;
