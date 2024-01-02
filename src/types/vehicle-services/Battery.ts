import * as z from "zod";
import { batteryParser } from "@/data/parsers";

/**
 * Represents the current Battery state
 * @property {BatteryHealth | undefined} health - The health status of the battery.
 * @property {BatteryStatus | undefined} status - The charging state of the battery.
 * @property {number | undefined} capacity - The remaining charge in the battery.
 * @property {BatteryPlugged | undefined} plugged - The plugged status of the battery.
 */
export type Battery = z.infer<typeof batteryParser>;
