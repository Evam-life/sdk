import * as z from "zod";
import { osVersionParser } from "@/data/parsers";

/**
 * The OS version of the Android device.
 */
export type OSVersion = z.infer<typeof osVersionParser>;
