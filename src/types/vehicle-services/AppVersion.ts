import * as z from "zod";
import { appVersionParser } from "@/data/parsers";

/**
 * The version of Vehicle Services
 */
export type AppVersion = z.infer<typeof appVersionParser>;
