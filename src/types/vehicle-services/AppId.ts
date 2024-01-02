import * as z from "zod";
import { appIdParser } from "@/data/parsers";

/**
 * ID of the certified application
 */
export type AppId = z.infer<typeof appIdParser>;
