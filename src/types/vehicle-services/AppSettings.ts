import { z } from "zod";
import { appSettingsParser } from "@/data/parsers";

/**
 * The app settings for the Vehicle Service's logged in Vehicle
 */
type AppSettings = z.infer<typeof appSettingsParser>;

export type { AppSettings };
