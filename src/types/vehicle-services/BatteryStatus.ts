import { z } from "zod";
import { batteryStatusParser } from "@/data/parsers";

/**
 * The charging status of a battery.
 */
export type BatteryStatus = z.infer<typeof batteryStatusParser>;
