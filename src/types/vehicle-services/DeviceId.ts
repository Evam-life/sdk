import * as z from "zod";
import { deviceIdParser } from "@/data/parsers";

/**
 * ID of the Android Devices
 */
export type DeviceId = z.infer<typeof deviceIdParser>;
