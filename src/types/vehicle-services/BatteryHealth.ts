import { z } from "zod";
import { batteryHealthParser } from "@/data/parsers";

/**
 * Represents the health of a battery.
 */
export type BatteryHealth = z.infer<typeof batteryHealthParser>;
