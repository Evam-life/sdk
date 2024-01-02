import { z } from "zod";
import { batteryPluggedParser } from "@/data/parsers";

/**
 * The plugged status of a battery.
 */
export type BatteryPlugged = z.infer<typeof batteryPluggedParser>;
